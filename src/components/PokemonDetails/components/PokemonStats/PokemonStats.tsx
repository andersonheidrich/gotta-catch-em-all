import type { PokemonStatsProps } from "./interfaces";

const PokemonStats = ({ stats }: PokemonStatsProps) => {
  return (
    <div className="flex flex-col w-full h-auto bg-[#A4A4A4] rounded-[8px] px-[16px] py-[8px] mb-[16px]">
      <div className="w-full mb-[16px] font-bold">Stats</div>
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
