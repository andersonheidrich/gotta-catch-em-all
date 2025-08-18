/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { pokeAPI } from "@/services/pokeAPI";
import type { PokemonData } from "@/types/pokemon";

// Buscar todos os pokemons
export const fetchAllPokemon = createAsyncThunk<
  PokemonData[],
  number | "all",
  { rejectValue: string }
>("pokemon/fetchAll", async (generationId, { rejectWithValue }) => {
  try {
    let species: any[] = [];

    if (generationId === "all") {
      const response = await pokeAPI.get("pokemon?limit=1025");
      species = response.data.results;
    } else {
      const response = await pokeAPI.get(`generation/${generationId}`);
      species = response.data.pokemon_species;
    }

    const detailed = await Promise.all(
      species.map(async (poke: any) => {
        try {
          const res = await pokeAPI.get(`pokemon/${poke.name}`);
          const sprite =
            res.data.sprites.other?.["official-artwork"]?.front_default ||
            res.data.sprites.other?.home?.front_default ||
            res.data.sprites.front_default ||
            "";
          return {
            id: res.data.id,
            name: res.data.name,
            sprite,
            types: res.data.types,
            height: res.data.height,
            weight: res.data.weight,
            abilities: res.data.abilities,
            stats: res.data.stats,
            url: res.data.url,
          };
        } catch {
          return null;
        }
      })
    );

    const validPokemons = detailed.filter(Boolean) as PokemonData[];
    validPokemons.sort((a, b) => a.id - b.id);

    return validPokemons;
  } catch (error: any) {
    return rejectWithValue(error.message || "Erro ao carregar Pokémon");
  }
});

// Buscar cadeia de evolução
export const fetchPokemonEvolution = createAsyncThunk<
  string[],
  string,
  { rejectValue: string }
>("pokemon/fetchEvolution", async (pokemonName, { rejectWithValue }) => {
  try {
    const speciesRes = await pokeAPI.get(`/pokemon-species/${pokemonName}`);
    const evoUrl = speciesRes.data.evolution_chain.url;
    const evoId = evoUrl.split("/").filter(Boolean).pop();

    const evoRes = await pokeAPI.get(`/evolution-chain/${evoId}`);
    const chain = evoRes.data.chain;

    const evolutions: string[] = [];
    const getEvolutions = (node: any) => {
      evolutions.push(node.species.name);
      node.evolves_to.forEach((evo: any) => getEvolutions(evo));
    };
    getEvolutions(chain);

    return evolutions;
  } catch (error: any) {
    return rejectWithValue(error.message || "Erro ao buscar evolução");
  }
});
