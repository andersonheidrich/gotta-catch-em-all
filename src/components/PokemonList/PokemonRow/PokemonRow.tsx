import { Link } from "react-router-dom";
import { getTypeColor } from "@/utils";
import type { PokemonRowProps } from "./interfaces";

const PokemonRow = ({ id, name, sprite, types, stats }: PokemonRowProps) => {
  const total = stats.reduce((sum, s) => sum + s.base_stat, 0);

  return (
    <tr className="flex w-full h-[64px] items-center border-b-[1px] capitalize">
      <td className="flex items-center w-[128px]">
        <img className="w-[32px] h-[32px]" src={sprite} alt={name} />
        <span className="w-[80px] ml-[16px]">
          Nº {id.toString().padStart(4, "0")}
        </span>
      </td>
      <td className="w-[160px]">
        <Link className="flex max-w-fit" to={`/${name.toLowerCase()}`}>
          <span className="underline font-bold hover:text-blue-700">
            {name}
          </span>
        </Link>
      </td>
      <td className="flex flex-col gap-y-[4px] w-[116px] justify-start">
        {types.map((poke) => (
          <span
            key={poke.type.name}
            className="flex w-[64px] h-[24px] justify-center items-center px-[4px] text-[12px] text-center rounded-[4px] font-bold"
            style={{
              backgroundColor: getTypeColor(poke.type.name),
            }}
          >
            {poke.type.name}
          </span>
        ))}
      </td>
      <td className="w-[84px]">
        <span>{total}</span>
      </td>
      <td className="flex">
        {stats?.map((poke) => (
          <span key={poke.stat.name} className="w-[84px]">
            {poke.base_stat}
          </span>
        ))}
      </td>
    </tr>
  );
};

export default PokemonRow;
