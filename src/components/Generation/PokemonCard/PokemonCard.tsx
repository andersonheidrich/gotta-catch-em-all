import { getTypeColor } from "../../../utils";
import type { PokemonCardProps } from "./interfaces";

const PokemonCard = ({ id, name, sprite, types }: PokemonCardProps) => {
  return (
    <div>
      <div className="flex flex-col w-[200px] h-[200px] justify-center items-center bg-[#F2F2F2] rounded-[8px] cursor-pointer hover:scale-103 transition-transform duration-250">
        <img className="w-full" src={sprite} alt={name} />
      </div>
      <div className="flex flex-col">
        <p className="pt-[4px]">Nº {id.toString().padStart(4, "0")}</p>
        <p className="pt-[4px]">{name}</p>
        <div className="flex pt-[4px] gap-[4px]">
          {types.map((poke) => (
            <p
              key={poke.type.name}
              className="flex px-[4px] py-[2px] rounded-[2px] capitalize"
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
