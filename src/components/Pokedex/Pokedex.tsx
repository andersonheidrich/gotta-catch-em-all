import { usePokemonList } from "@/hooks/usePokemonList";
import PokemonCard from "./PokemonCard";
import "./styles.css";
import { GenerationFilter } from "@/components";

const Pokedex = () => {
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

  if (loading)
    return (
      <p className="flex h-full justify-center items-center bg-[#2b2b2b] text-white">
        Carregando...
      </p>
    );

  if (error)
    return (
      <p className="flex h-full justify-center items-center bg-[#2b2b2b] text-white">
        Erro: {error}
      </p>
    );

  return (
    <div className="flex flex-col pt-[124px] pb-[64px] justify-center items-center bg-[#2b2b2b]">
      <GenerationFilter selectedGen={selectedGen} onChange={setSelectedGen} />
      <div className="pokedex-grid rounded-[8px] bg-white">
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
