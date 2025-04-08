"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import Link from "next/link";
interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  created: string;
}

interface Resident {
  id: number;
  name: string;
}

export default function LocationDetails() {
  const { id } = useParams();

  const [location, setLocation] = useState<Location | null>(null);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchLocation = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/location/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch location data");
        }
        const locationData: Location = await response.json();
        setLocation(locationData);

        const residentRequests = locationData.residents.map((url) =>
          fetch(url).then((res) => res.json())
        );
        const residentData = await Promise.all(residentRequests);
        const residentNames = residentData.map((resident) => ({
          id: resident.id,
          name: resident.name,
        }));
        setResidents(residentNames);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [id]);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="px-6 py-12">
      <h1 className="text-4xl font-extrabold text-center text-teal-500 mb-12">
        Location Details
      </h1>
      <div className="bg-blue-600 text-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold">{location?.name}</h2>
        <p className="text-lg text-gray-300 mt-2">Type: {location?.type}</p>
        <p className="text-md text-gray-300 mt-2">
          Dimension: {location?.dimension}
        </p>
        <p className="mt-4 text-lg">
          <strong>Residents Count: </strong> {location?.residents.length}
        </p>
        <p className="text-md text-gray-300 mt-2">
          <strong>Created: </strong> {location?.created}
        </p>
      </div>
      {residents.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-center text-teal-500 mb-4">
            Residents
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {residents.map((resident) => (
              <li key={resident.id}>
                <Link
                  href={`/characters/${resident.id}`}
                  className="text-teal-400 hover:text-teal-200 underline"
                >
                  {resident.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
