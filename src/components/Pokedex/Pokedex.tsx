import { useState } from "react";
import { useAllPokemon } from "@/hooks";
import PokemonCard from "./PokemonCard";
import "./styles.css";
import { GenerationFilter } from "@/components";

const Pokedex = () => {
  const [selectedGen, setSelectedGen] = useState<number | "all">("all");
  const { pokemonList, loading, error, visibleCount, loadMoreRef, hasMore } =
    useAllPokemon(selectedGen);

  const visiblePokemon = pokemonList.slice(0, visibleCount);

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
        {visiblePokemon.map((poke) => (
          <div key={poke.name} className="w-[200px]">
            <PokemonCard
              key={poke.name}
              id={poke.id}
              name={poke.name}
              sprite={poke.sprite}
              types={poke.types}
            />
          </div>
        ))}
        {hasMore && <div ref={loadMoreRef} />}
      </div>
    </div>
  );
};

export default Pokedex;
