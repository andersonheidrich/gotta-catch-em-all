import { getTypeColor } from "@/utils";
import type { PokemonRowProps } from "./interfaces";
import { Link } from "react-router-dom";

const PokemonRow = ({ id, name, sprite, types, stats }: PokemonRowProps) => {
  return (
    <div className="flex h-[64px] items-center border-b-[1px] capitalize">
      <img className="w-[32px] h-[32px] mr-[16px]" src={sprite} alt={name} />
      <p className="mr-[16px]">Nº {id.toString().padStart(4, "0")}</p>
      <div className="w-[256px] mr-[16px]">
        <Link className="flex max-w-fit" to={`/${name.toLowerCase()}`}>
          <p>{name}</p>
        </Link>
      </div>
      <div className="flex flex-col gap-y-[4px]">
        {types.map((poke) => (
          <p
            key={poke.type.name}
            className="flex w-[64px] justify-center rounded-[2px] mr-[64px]"
            style={{
              backgroundColor: getTypeColor(poke.type.name),
            }}
          >
            {poke.type.name}
          </p>
        ))}
      </div>
      <div className="flex">
        {stats?.map((poke) => (
          <div className="w-[128px]">
            <p key={poke.stat.name}>{poke.stat.name}</p>
            <p key={poke.base_stat}>{poke.base_stat}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonRow;
