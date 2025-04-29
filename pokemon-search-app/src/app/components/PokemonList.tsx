import PokemonCard from "./PokemonCard";

export default function PokemonList({ pokemon }: any) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemon.map((p: any) => (
        <PokemonCard key={p.name} pokemon={p} />
      ))}
    </div>
  );
}
