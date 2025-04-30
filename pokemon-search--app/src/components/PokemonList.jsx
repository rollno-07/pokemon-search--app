import PokemonCard from "./PokemonCard";

export default function PokemonList({ pokemon }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemon?.map((p) => (
        <PokemonCard key={p.name} pokemon={p} />
      ))}
    </div>
  );
}
