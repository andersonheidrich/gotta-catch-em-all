/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { pokeAPI } from "../services/pokeAPI";
import type { PokemonData } from "@/types/pokemon";

export const useAllPokemon = (generationId: number | "all") => {
  const [pokemonList, setPokemonList] = useState<PokemonData[]>([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      setLoading(true);
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

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 20, pokemonList.length));
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [pokemonList]);

  return {
    pokemonList,
    visibleCount,
    loading,
    error,
    loadMoreRef,
    hasMore: visibleCount < pokemonList.length,
  };
};
