import { Link } from "react-router-dom";
import { getTypeColor } from "@/utils";
import type { PokemonCardProps } from "./interfaces";

const PokemonCard = ({ id, name, sprite, types }: PokemonCardProps) => {
  const typeColor = getTypeColor(types[0].type.name);

  return (
    <div className="mb-[40px]">
      <div
        className="flex flex-col w-[200px] h-[200px] justify-center items-center rounded-[8px] cursor-pointer hover:scale-103 transition-transform duration-300"
        style={{
          background: `${typeColor}`,
        }}
      >
        <Link to={`/${name.toLowerCase()}`}>
          <img className="w-full" src={sprite} alt={name} />
        </Link>
      </div>
      <div className="flex flex-col">
        <p className="font-bold pt-[4px] text-[#A4A4A4] text-[14px]">
          Nº {id.toString().padStart(4, "0")}
        </p>
        <p className="font-bold pt-[4px] text-[20px]">{name}</p>
        <div className="flex pt-[4px] gap-[4px]">
          {types.map((poke) => (
            <p
              key={poke.type.name}
              className="flex px-[4px] py-[2px] rounded-[2px] capitalize font-bold text-[12px]"
              style={{ backgroundColor: getTypeColor(poke.type.name) }}
            >
              {poke.type.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
