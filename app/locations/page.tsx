"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Pagination from "@/components/Pagination";
interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  created: string;
}

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/location?page=${currentPage}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data = await response.json();
        setLocations(data.results);
        setTotalPages(data.info.pages);
      } catch (error) {
        setError("Error fetching locations");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [currentPage]);

  if (error) return <div>{error}</div>;

  return (
    <div className="px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-teal-500 mb-12">
        Locations
      </h1>
      <ul className="space-y-4">
        {locations
          .map((location) => (
            <li
              key={location.id}
              className="bg-blue-600 text-white p-4 rounded-lg shadow-lg"
            >
              <Link href={`/locations/${location.id}`}>
                <h2 className="text-2xl font-semibold">{location.name}</h2>
              </Link>
              <p className="text-lg text-gray-300 mt-2">
                Type: {location.type}
              </p>
              <p className="text-md text-gray-300 mt-2">
                Dimension: {location.dimension}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Created on: {location.created}
              </p>
            </li>
          ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
