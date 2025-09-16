import { useTranslation } from "react-i18next";
import type { PokemonTypesProps } from "./interfaces";
import { getTypeColor } from "@/utils";

const PokemonTypes = ({ types }: PokemonTypesProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col mb-[16px] md:mb-[0]">
      <div className="mb-[16px] font-bold">{t("pokemonDetails.type")}</div>
      <div className="flex w-full gap-x-[16px] capitalize text-white">
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
