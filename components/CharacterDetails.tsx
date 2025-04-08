"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import styles from "../app/styles/styles.module.scss";

export default function CharacterDetails() {
  const [character, setCharacter] = useState<any | null>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathname = usePathname();

  const characterID = Number(pathname.split("/").pop() || "0");

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${characterID}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch character data");
        }
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (characterID) {
      fetchCharacter();
    }
  }, [characterID]);

  useEffect(() => {
    if (!character) return;

    const fetchEpisodes = async () => {
      try {
        const episodeIDs = character.episode.map((episodeUrl: string) =>
          episodeUrl.split("/").pop()
        );

        const episodeRequests = episodeIDs.map((id: string) =>
          fetch(`https://rickandmortyapi.com/api/episode/${id}`).then((res) =>
            res.json()
          )
        );

        const episodesData = await Promise.all(episodeRequests);
        setEpisodes(episodesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEpisodes();
  }, [character]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading character data...</p>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Character not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 px-6">
      <div className="flex flex-col lg:flex-row bg-blue-500 p-6 rounded-lg text-white gap-8">
        <Image
          className="rounded-lg"
          src={character.image}
          alt={`${character.name}`}
          width={300}
          height={300}
          priority
        />
        <div>
          <h2 className="text-4xl font-bold">{character.name}</h2>
          <div className="flex items-center mt-2">
            <span
              className={classNames(styles["status-icon"], {
                [styles["status-alive"]]: character.status === "Alive",
                [styles["status-dead"]]: character.status === "Dead",
                [styles["status-unknown"]]: character.status === "unknown",
              })}
            ></span>
            <span className="ml-2 text-lg">
              {character.status === "unknown" ? "Unknown" : character.status}
            </span>
          </div>
          <div className="mt-4">
            <p>Gender: {character.gender}</p>
            <p>Species: {character.species}</p>
            <p>Type: {character.type || "None"}</p>
            <p>
              Origin:{" "}
              <Link
                href={`/locations/${character.origin.url.split("/").pop()}`}
                className="text-teal-300 hover:text-teal-500"
              >
                {character.origin.name}
              </Link>
            </p>
            <p>
              Last location:{" "}
              <Link
                href={`/locations/${character.location.url.split("/").pop()}`}
                className="text-teal-300 hover:text-teal-500"
              >
                {character.location.name}
              </Link>
            </p>
            <p>Episodes count: {character.episode.length}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-red-600 mb-4">Episodes:</h3>
        {episodes.length === 0 ? (
          <p>Loading episodes...</p>
        ) : (
          <ul>
            {episodes.map((episode) => (
              <li key={episode.id}>
                <Link
                  href={`/episodes/${episode.id}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  {episode.name} (Air Date: {episode.air_date})
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
