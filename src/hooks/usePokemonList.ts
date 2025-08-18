import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchAllPokemon,
  loadMore,
  resetVisibleCount,
} from "@/store/slices/pokemon";
import { useInfiniteScroll } from "./useInfiniteScroll";

export const usePokemonList = () => {
  const [selectedGen, setSelectedGen] = useState<number | "all">("all");
  const dispatch = useAppDispatch();

  const { pokemonList, visibleCount, loading, error } = useAppSelector(
    (state) => state.pokemon
  );

  const hasMore = visibleCount < pokemonList.length;

  useEffect(() => {
    dispatch(resetVisibleCount());
    dispatch(fetchAllPokemon(selectedGen));
  }, [dispatch, selectedGen]);

  const sentinelRef = useInfiniteScroll(() => {
    if (!loading && hasMore) {
      dispatch(loadMore());
    }
  });

  return {
    selectedGen,
    setSelectedGen,
    pokemonList,
    visibleCount,
    loading,
    error,
    hasMore,
    sentinelRef,
  };
};
