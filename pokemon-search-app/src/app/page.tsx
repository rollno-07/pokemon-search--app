"use client";

import { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";
import PokemonList from "./components/PokemonList";
import { fetchPokemonList } from "./utils/fetchPokemonList";

export default function Home() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetchPokemonList(type, search).then(setPokemon);
  }, [search, type]);

  return (
    <div>
      <SearchForm
        search={search}
        onSearchChange={setSearch}
        type={type}
        onTypeChange={setType}
      />
      <PokemonList pokemon={pokemon} />
    </div>
  );
}
