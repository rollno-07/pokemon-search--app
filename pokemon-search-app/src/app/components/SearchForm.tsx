"use client";

import { useEffect, useState } from "react";

export default function SearchForm({
  search,
  onSearchChange,
  type,
  onTypeChange,
}: any) {
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type")
      .then((res) => res.json())
      .then((data) => setTypes(data.results.map((t: any) => t.name)));
  }, []);

  return (
    <form className="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search Pokémon"
        className="border p-2 rounded-xl w-full sm:w-1/2"
      />
      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
        className="border p-2 rounded-xl w-full sm:w-1/2"
      >
        <option value="">All Types</option>
        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </form>
  );
}
