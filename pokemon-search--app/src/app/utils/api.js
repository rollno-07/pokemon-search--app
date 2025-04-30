export async function fetchPokemonList(type, search) {
  let allPokemon = [];

  if (type) {
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await res.json();
    // Extract pokemon from nested structure
    allPokemon = data.pokemon.map((p) => ({
      name: p.pokemon.name,
      url: p.pokemon.url,
    }));
  } else {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
    const data = await res.json();
    allPokemon = data.results;
  }

  // Filter by name if search is provided
  if (search) {
    allPokemon = allPokemon.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return allPokemon;
}



export async function fetchPokemonDetails(name) {
  const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = await pokemonRes.json();

  const speciesRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${name}`
  );
  const species = await speciesRes.json();

  const flavor = species.flavor_text_entries.find(
    (entry) => entry.language.name === "en"
  );

  const evoChainRes = await fetch(species.evolution_chain.url);
  const evoChain = await evoChainRes.json();

  const evolutionNames = extractEvolutions(evoChain.chain);

  const evolutionDetails = await Promise.all(
    evolutionNames.map(async (evoName) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoName}`);
      const data = await res.json();
      return {
        name: data.name,
        id: data.id,
        sprite: data.sprites.front_default,
        types: data.types.map((t) => t.type.name),
      };
    })
  );

  return {
    ...pokemon,
    flavor_text:
      flavor?.flavor_text.replace(/\f/g, " ") ?? "No description available.",
    evolutions: evolutionDetails,
  };
}

function extractEvolutions(chain) {
  const names = [];

  let current = chain;
  while (current) {
    names.push(current.species.name);
    current = current.evolves_to?.[0];
  }

  return names;
}

export async function fetchPokemonTypes() {
  const res = await fetch("https://pokeapi.co/api/v2/type");
  const data = await res.json();
  return data.results.map((t) => t.name);
}
