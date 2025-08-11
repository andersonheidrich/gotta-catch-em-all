/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { pokeAPI } from "../services/pokeAPI";
import type { PokemonData } from "@/types/pokemon";

export const useAllPokemon = (generationId: number) => {
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      setLoading(true);
      try {
        // 1. Buscar pokémons da geração
        const response = await pokeAPI.get(`generation/${generationId}`);
        const species = response.data.pokemon_species;

        // 2. Buscar detalhes (com sprite) para cada um
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

        // Remover nulls e ordenar por nome
        const validPokemons = detailed
          .filter(Boolean)
          .sort((a, b) => a!.id - b!.id) as PokemonData[];

        setPokemonList(validPokemons);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, [generationId]);

  return { pokemonList, loading, error };
};
