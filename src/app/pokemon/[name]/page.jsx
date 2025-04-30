// app/pokemon/[name]/page.tsx
import { fetchPokemonDetails } from "@/app/utils/api";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";



export default async function PokemonDetail({ params }) {
  const pokemon = await fetchPokemonDetails(params.name);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <Breadcrumb name={pokemon.name} />
      <div className="flex justify-between items-center border-b pb-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold capitalize">
            {pokemon.name}{" "}
            <span className="text-gray-500">
              #{pokemon.id.toString().padStart(4, "0")}
            </span>
          </h1>
          <p className="text-gray-600">{pokemon.flavor_text}</p>
        </div>
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={160}
          height={160}
          className="object-contain"
        />
      </div>

      {/* Info Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Type:</span>
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="px-3 py-1 bg-orange-500 text-white text-sm rounded-full capitalize"
              >
                {t.type.name}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Abilities:</span>
            {pokemon.abilities.map((a) => (
              <span
                key={a.ability.name}
                className="text-sm font-medium capitalize"
              >
                {a.ability.name}
              </span>
            ))}
          </div>

          <div className="text-sm text-gray-600">
            <p>Height: {pokemon.height / 10} m</p>
            <p>Weight: {pokemon.weight / 10} kg</p>
          </div>
        </div>

        {/* Right - Stats */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Stats</h3>
          <div className="space-y-2">
            {pokemon.stats.map((s) => (
              <div key={s.stat.name} className="space-y-1">
                <div className="flex justify-between text-sm font-medium capitalize">
                  <span>{s.stat.name}</span>
                  <span>{s.base_stat}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${s.base_stat/2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      

      {/* Evolutions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Evolutions</h3>
        <div className="flex items-center space-x-6 overflow-x-auto">
          {pokemon.evolutions.map((evo) => (
            <Link key={evo.name} href={`/pokemon/${evo.name}`}>
              <div className="text-center space-y-2">
                <Image
                  src={evo.sprite}
                  alt={evo.name}
                  width={96}
                  height={96}
                  className="mx-auto"
                />
                <p className="capitalize font-medium">
                  {evo.name}{" "}
                  <span className="text-gray-400">
                      #{String(evo.id).padStart(4, "0")}
                  </span>
                </p>
                <div className="flex justify-center gap-1">
                  {evo.types.map((type) => (
                    <span
                      key={type}
                      className="text-xs bg-orange-300 text-white px-2 py-1 rounded-full capitalize"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
