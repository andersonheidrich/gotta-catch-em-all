/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { pokeAPI } from "../services/pokeAPI";
import type { PokemonData } from "@/types/pokemon";

interface UsePokemonResult {
  pokemon: PokemonData | null;
  loading: boolean;
  error: string | null;
}

export const usePokemon = (nameOrId: string): UsePokemonResult => {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await pokeAPI.get(`pokemon/${nameOrId}`);
        setPokemon(response.data);

        const sprite =
          response.data.sprites.other?.["official-artwork"]?.front_default ||
          response.data.sprites.other?.home?.front_default ||
          response.data.sprites.front_default ||
          "";

        const formattedData: PokemonData = {
          id: response.data.id,
          name: response.data.name,
          sprite,
          types: response.data.types,
          height: response.data.height,
          weight: response.data.weight,
          abilities: response.data.abilities,
          stats: response.data.stats,
          url: response.data.url,
        };

        setPokemon(formattedData);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [nameOrId]);

  return { pokemon, loading, error };
};
