"use client";

import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {
  setFilter,
  fetchCharacters,
  fetchAllSpecies,
} from "../../store/slices/characterSlice";
import CharacterList from "../../components/CharactersList";
import SearchFilter from "../../components/SearchFilter";
import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";

const CharactersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filters, info } = useSelector((state: RootState) => state.characters);
  const [currentPage, setCurrentPage] = useState(1);
  const [allSpecies, setAllSpecies] = useState<string[]>([]);

  const updateFilter = (key: string, value: string) => {
    const updatedFilter = value === "" ? [] : [value];
    dispatch(setFilter({ [key]: updatedFilter }));
  };

  const applyFilters = () => {
    const queryParams = new URLSearchParams();
    if (filters.search) queryParams.append("name", filters.search);
    if (filters.status.length) queryParams.append("status", filters.status[0]);
    if (filters.species.length)
      queryParams.append("species", filters.species[0]);
    if (filters.gender.length) queryParams.append("gender", filters.gender[0]);
    queryParams.append("page", currentPage.toString());

    dispatch(fetchCharacters(`?${queryParams.toString()}`));
  };

  useEffect(() => {
    applyFilters();
  }, [filters, currentPage]);

  useEffect(() => {
    dispatch(fetchAllSpecies())
      .unwrap()
      .then((speciesList: string[]) => {
        setAllSpecies(speciesList);
      })
      .catch((error) => {
        console.error("Error fetching species:", error);
      });
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Rick and Morty - Characters</title>
      </Head>
      <main className="min-h-screen bg-gray-100">
        <header className="bg-teal-600 text-white p-4">
          <h1 className="text-center text-3xl">Rick and Morty Characters</h1>
        </header>

        <SearchFilter
          filters={filters}
          onSearch={(value) => dispatch(setFilter({ search: value }))}
          onFilterChange={updateFilter}
          onPageChange={setCurrentPage}
          allSpecies={allSpecies}
        />

        <CharacterList />

        {info && (
          <Pagination
            currentPage={currentPage}
            totalPages={info.pages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>
    </>
  );
};

export default CharactersPage;
