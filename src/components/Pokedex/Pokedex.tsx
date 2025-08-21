import { usePokemonList } from "@/hooks/usePokemonList";
import PokemonCard from "./PokemonCard";
import { GenerationFilter } from "@/components";
import { useTranslation } from "react-i18next";

const Pokedex = () => {
  const { t } = useTranslation();

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

  return (
    <div className="flex flex-col pt-[124px] pb-[64px] justify-center items-center bg-[#2b2b2b]">
      <GenerationFilter selectedGen={selectedGen} onChange={setSelectedGen} />
      <div className="flex flex-wrap w-[224px] min-[640px]:w-[440px] min-[768px]:w-[656px] min-[1024px]:w-[872px] min-[1280px]:w-[1088px] min-[1536px]:w-[1304px] min-h-screen justify-center gap-[16px] p-[12px] rounded-[8px] bg-white capitalize justify-start">
        {loading ? (
          <div>{t("loading")}</div>
        ) : error ? (
          <div>
            {t("error")}: {error}
          </div>
        ) : (
          pokemonList.slice(0, visibleCount).map((poke) => (
            <div key={poke.name} className="w-[200px]">
              <PokemonCard
                id={poke.id}
                name={poke.name}
                sprite={poke.sprite}
                types={poke.types}
              />
            </div>
          ))
        )}
        {hasMore && <div ref={sentinelRef} />}
      </div>
    </div>
  );
};

export default Pokedex;
