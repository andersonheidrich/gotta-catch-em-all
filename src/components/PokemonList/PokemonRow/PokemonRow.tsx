import { Link } from "react-router-dom";
import { getTypeColor } from "@/utils";
import type { PokemonRowProps } from "./interfaces";

const PokemonRow = ({ id, name, sprite, types, stats }: PokemonRowProps) => {
  const total = stats.reduce((sum, s) => sum + s.base_stat, 0);

  return (
    <div className="flex w-full h-[64px] items-center border-b-[1px] capitalize">
      <div className="flex items-center w-[128px]">
        <img className="w-[32px] h-[32px]" src={sprite} alt={name} />
        <p className="w-[80px] ml-[16px]">
          Nº {id.toString().padStart(4, "0")}
        </p>
      </div>
      <div className="w-[256px]">
        <Link className="flex max-w-fit" to={`/${name.toLowerCase()}`}>
          <p className="hover:underline">{name}</p>
        </Link>
      </div>
      <div className="flex flex-col gap-y-[4px] w-[116px] justify-start">
        {types.map((poke) => (
          <p
            key={poke.type.name}
            className="flex w-[64px] h-[24px] justify-center items-center px-[4px] text-[12px] text-center rounded-[4px]"
            style={{
              backgroundColor: getTypeColor(poke.type.name),
            }}
          >
            {poke.type.name}
          </p>
        ))}
      </div>
      <div className="w-[116px]">
        <p>{total}</p>
      </div>
      <div className="flex">
        {stats?.map((poke) => (
          <div key={poke.stat.name} className="w-[116px]">
            <p>{poke.base_stat}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonRow;
