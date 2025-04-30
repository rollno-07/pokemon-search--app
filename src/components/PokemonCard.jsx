"use client";

import Link from "next/link";
import Image from "next/image";

export default function PokemonCard({ pokemon }) {
  const id = pokemon.url.split("/").filter(Boolean).pop();
  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className="bg-white rounded-xl p-4 shadow hover:scale-105 transition-transform"
    >
      <h3 className="text-lg font-bold text-black capitalize">
        {pokemon.name}
      </h3>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={pokemon.name}
        width={260}
        height={260}
        className="w-20 h-20 object-contain mx-auto"
        unoptimized // <--- disables optimization (helps avoid 429 in dev)
        priority
      />
      <p className="text-black">Details....</p>
    </Link>
  );
}
