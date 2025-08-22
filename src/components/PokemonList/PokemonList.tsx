import { usePokemonListFiltered } from "@/hooks";
import PokemonRow from "./PokemonRow";
import { Filter, GenerationFilter } from "@/components";
import { useTranslation } from "react-i18next";

const PokemonList = () => {
  const { t } = useTranslation();

  const {
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
  } = usePokemonListFiltered();

  return (
    <div className="flex flex-col w-full pt-[124px] pb-[64px] justify-center items-center bg-[#2b2b2b]">
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <GenerationFilter selectedGen={selectedGen} onChange={setSelectedGen} />
      <div className="overflow-x-auto w-full max-w-[1024px] mt-3 justify-center bg-white rounded-0 lg:rounded-[8px]">
        <table className="m-4">
          <thead className="border-y border-[#cacaca] bg-[#EBEBEB]">
            <tr className="flex py-[16px] justify-start">
              <th className="flex w-[80px] ml-[48px]">#</th>
              <th className="flex w-[160px]">{t("pokemonDetails.name")}</th>
              <th className="flex w-[116px]">{t("pokemonDetails.type")}</th>
              <th className="flex w-[84px]">{t("pokemonDetails.total")}</th>
              <th className="flex w-[84px]">{t("pokemonDetails.hp")}</th>
              <th className="flex w-[84px]">{t("pokemonDetails.attack")}</th>
              <th className="flex w-[84px]">{t("pokemonDetails.defense")}</th>
              <th className="flex w-[84px]">
                {t("pokemonDetails.specialAttack")}
              </th>
              <th className="flex w-[84px]">
                {t("pokemonDetails.specialDefense")}
              </th>
              <th className="flex w-[84px]">{t("pokemonDetails.speed")}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="flex h-screen justify-center pt-64">
                  {t("loading")}
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td className="flex h-screen justify-center items-center">
                  {t("error")}: {error}
                </td>
              </tr>
            ) : (
              filteredPokemon
                .slice(0, visibleCount)
                .map((poke) => (
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
        {hasMore && <div ref={sentinelRef} />}
      </div>
    </div>
  );
};

export default PokemonList;
