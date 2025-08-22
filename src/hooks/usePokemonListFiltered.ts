import { useState, useMemo, useEffect } from "react";
import { usePokemonList } from "@/hooks/usePokemonList";

export const usePokemonListFiltered = (delay = 300) => {
  const {
    selectedGen,
    setSelectedGen,
    pokemonList,
    visibleCount,
    loading,
    error,
    hasMore,
    sentinelRef,
  } = usePokemonList();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  // debounce para o search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedTerm(searchTerm), delay);
    return () => clearTimeout(handler);
  }, [searchTerm, delay]);

  // lista filtrada pelo termo de pesquisa
  const filteredPokemon = useMemo(() => {
    return pokemonList.filter((p) =>
      p.name.toLowerCase().includes(debouncedTerm.toLowerCase())
    );
  }, [pokemonList, debouncedTerm]);

  return {
    selectedGen,
    setSelectedGen,
    visibleCount,
    loading,
    error,
    hasMore,
    sentinelRef,
    searchTerm,
    setSearchTerm,
    filteredPokemon,
  };
};
