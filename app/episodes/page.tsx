"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Pagination from "@/components/Pagination";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  url: string;
  created: string;
}

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/episode?page=${currentPage}`
        );
        if (!res.ok) throw new Error("Failed to fetch episodes");
        const data = await res.json();
        setEpisodes(data.results);
        setTotalPages(data.info.pages);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [currentPage]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-teal-500 mb-12">
        Rick and Morty Episodes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {episodes.map((episode) => (
          <Link
            key={episode.id}
            href={`/episodes/${episode.id}`}
            className="p-6 bg-blue-600 text-white rounded-lg shadow-lg hover:shadow-2xl transition"
          >
            <h2 className="text-2xl font-semibold">{episode.name}</h2>
            <p className="text-lg text-gray-300">Air Date: {episode.air_date}</p>
            <p className="text-md text-gray-300">Episode: {episode.episode}</p>
          </Link>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
