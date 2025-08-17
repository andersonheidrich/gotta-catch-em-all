import { useState } from "react";
import { useAllPokemon } from "@/hooks";
import PokemonRow from "./PokemonRow";
import { GenerationFilter } from "@/components";

const PokemonList = () => {
  const [selectedGen, setSelectedGen] = useState<number | "all">("all");
  const { pokemonList, loading, error, visibleCount, loadMoreRef, hasMore } =
    useAllPokemon(selectedGen);

  const visiblePokemon = pokemonList.slice(0, visibleCount);

  return (
    <div className="flex flex-col w-full pt-[124px] pb-[64px] justify-center items-center">
      <GenerationFilter selectedGen={selectedGen} onChange={setSelectedGen} />
      <div className="overflow-x-auto w-full max-w-[1344px] mt-3 justify-center">
        <table className="mx-4">
          <thead className="border-y border-[#cacaca] bg-[#EBEBEB]">
            <tr className="flex py-[16px] justify-start">
              <th className="flex w-[80px] ml-[48px]">#</th>
              <th className="flex w-[256px]">Name</th>
              <th className="flex w-[116px]">Type</th>
              <th className="flex w-[116px]">Total</th>
              <th className="flex w-[116px]">HP</th>
              <th className="flex w-[116px]">Attack</th>
              <th className="flex w-[116px]">Defense</th>
              <th className="flex w-[116px]">Sp. Atk</th>
              <th className="flex w-[116px]">Sp. Def</th>
              <th className="flex w-[116px]">Speed</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div className="flex h-screen justify-center pt-64">
                Carregando...
              </div>
            ) : error ? (
              <div className="flex h-full justify-center items-center">
                Erro: {error}
              </div>
            ) : (
              visiblePokemon.map((poke) => (
                <PokemonRow
                  key={poke.name}
                  id={poke.id}
                  name={poke.name}
                  sprite={poke.sprite}
                  types={poke.types}
                  stats={poke.stats}
                />
              ))
            )}
          </tbody>
        </table>
        {hasMore && <div ref={loadMoreRef} />}
      </div>
    </div>
  );
};

export default PokemonList;
