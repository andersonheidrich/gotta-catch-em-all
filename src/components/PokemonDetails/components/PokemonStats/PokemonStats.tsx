import { useTranslation } from "react-i18next";
import type { PokemonStatsProps } from "./interfaces";

const PokemonStats = ({ stats }: PokemonStatsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full h-auto bg-[#A4A4A4] rounded-[8px] px-[16px] py-[8px] mb-[16px] md:mb-[0]">
      <div className="w-full mb-[16px] font-bold">
        {t("pokemonDetails.stats")}
      </div>
      <div>
        {stats.map((s) => (
          <div key={s.stat.name} className="mb-[2px] capitalize">
            {s.stat.name}: {s.base_stat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonStats;
