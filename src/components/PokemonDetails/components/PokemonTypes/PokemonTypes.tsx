import type { PokemonTypesProps } from "./interfaces";
import { getTypeColor } from "@/utils";

const PokemonTypes = ({ types }: PokemonTypesProps) => {
  return (
    <div className="flex flex-col mb-[16px] md:mb-[0]">
      <div className="mb-[16px] font-bold">Type</div>
      <div className="flex w-full gap-x-[16px] capitalize">
        {types.map((poke) => (
          <span
            key={poke.type.name}
            className="px-[32px] py-[8px] rounded-[8px] gap-x-[16px]"
            style={{ backgroundColor: getTypeColor(poke.type.name) }}
          >
            {poke.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonTypes;
