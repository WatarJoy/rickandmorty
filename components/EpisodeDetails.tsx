"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  created: string;
}

interface Character {
  id: number;
  name: string;
}

export default function EpisodeDetails() {
  const { id } = useParams();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchEpisode = async () => {
      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/episode/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch episode");

        const data: Episode = await res.json();
        setEpisode(data);

        const characters = await Promise.all(
          data.characters.map((url) => fetch(url).then((res) => res.json()))
        );

        setCharacters(characters.map((c) => ({ id: c.id, name: c.name })));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisode();
  }, [id]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-teal-500 mb-12">
        Episode Details
      </h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="bg-blue-600 text-white rounded-lg shadow-lg p-6">
            <h2 className="text-3xl font-semibold">{episode?.name}</h2>
            <p className="text-lg text-gray-300 mt-2">
              Air Date: {episode?.air_date}
            </p>
            <p className="text-md text-gray-300 mt-2">
              Episode: {episode?.episode}
            </p>
            <p className="mt-4 text-lg">
              <strong>Created: </strong> {episode?.created}
            </p>
          </div>

          {characters.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-center text-teal-500 mb-4">
                Characters in this Episode
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {characters.map((character) => (
                  <li key={character.id}>
                    <Link
                      href={`/characters/${character.id}`}
                      className="text-teal-400 hover:text-teal-200 underline"
                    >
                      {character.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
