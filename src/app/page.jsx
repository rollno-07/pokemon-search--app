"use client";

import { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import PokemonList from "../components/PokemonList";
import { fetchPokemonList } from "./utils/api";

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPokemonList(type, search).then((data) => {
      setPokemon(data);
      setCurrentPage(1); // Reset to first page on new filter
    });
  }, [search, type]);

  const totalPages = Math.ceil((pokemon?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPokemon = (pokemon || []).slice(startIndex, endIndex);

  return (
    <div className="p-4">
      <SearchForm
        search={search}
        onSearchChange={setSearch}
        type={type}
        onTypeChange={setType}
      />

      <PokemonList pokemon={currentPokemon} />

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 text-black"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </button>

          <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>

          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 text-black"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
