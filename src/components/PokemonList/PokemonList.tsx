import { useAllPokemon } from "@/hooks";
import PokemonRow from "./PokemonRow";

const PokemonList = () => {
  const { pokemonList, loading, error, visibleCount, loadMoreRef, hasMore } =
    useAllPokemon(1);

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
    <div className="flex w-full pt-[154px] pb-[64px] justify-center items-center">
      <div className="overflow-x-auto w-full max-w-[1344px] mx-[16px] justify-center">
        <table>
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
            {visiblePokemon.map((poke) => (
              <PokemonRow
                key={poke.name}
                id={poke.id}
                name={poke.name}
                sprite={poke.sprite}
                types={poke.types}
                stats={poke.stats}
              />
            ))}
          </tbody>
        </table>
        {hasMore && <div ref={loadMoreRef} />}
      </div>
    </div>
  );
};

export default PokemonList;
