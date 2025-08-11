import type { PokemonStatsProps } from "./interfaces";

const PokemonStats = ({ stats }: PokemonStatsProps) => {
  return (
    <div className="flex flex-col w-[400px] h-[200px] bg-[#A4A4A4] rounded-[8px] px-[16px] py-[8px]">
      <h2 className="w-full mb-[16px]">Stats</h2>
      <div>
        {stats.map((s) => (
          <h4 key={s.stat.name} className="mb-[2px] capitalize">
            {s.stat.name}: {s.base_stat}
          </h4>
        ))}
      </div>
    </div>
  );
};

export default PokemonStats;
