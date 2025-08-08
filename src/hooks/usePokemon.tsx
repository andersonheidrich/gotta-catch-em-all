/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { pokeAPI } from "../services/pokeAPI";
import type { PokemonData } from "../services/interfaces";

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
