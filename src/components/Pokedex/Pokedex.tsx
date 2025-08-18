import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchAllPokemon,
  loadMore,
  resetVisibleCount,
} from "@/store/slices/pokemonSlice";
import PokemonCard from "./PokemonCard";
import "./styles.css";
import { GenerationFilter } from "@/components";
import { useInfiniteScroll } from "@/hooks";

const Pokedex = () => {
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

  if (loading)
    return (
      <p className="flex h-full justify-center items-center">Carregando...</p>
    );

  if (error)
    return (
      <p className="flex h-full justify-center items-center">Erro: {error}</p>
    );

  return (
    <div className="flex flex-col pt-[124px] pb-[64px] justify-center items-center">
      <GenerationFilter selectedGen={selectedGen} onChange={setSelectedGen} />
      <div className="pokedex-grid rounded-[8px]">
        {pokemonList.slice(0, visibleCount).map((poke) => (
          <div key={poke.name} className="w-[200px]">
            <PokemonCard
              id={poke.id}
              name={poke.name}
              sprite={poke.sprite}
              types={poke.types}
            />
          </div>
        ))}
        {hasMore && <div ref={sentinelRef} />}
      </div>
    </div>
  );
};

export default Pokedex;
