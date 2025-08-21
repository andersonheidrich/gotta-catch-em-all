import { useTranslation } from "react-i18next";
import type { PokemonInfoProps } from "./interfaces";

const PokemonInfo = ({ height, weight, abilities }: PokemonInfoProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#30a7d7] rounded-[8px] px-[16px] py-[8px]">
      <p className="mb-[4px]">
        {t("pokemonDetails.height")}: <span>{height / 10} m</span>
      </p>
      <p className="mb-[4px]">
        {t("pokemonDetails.weight")}: <span>{weight / 10} kg</span>
      </p>
      <p>
        {t("pokemonDetails.abilities")}:{" "}
        <span>{abilities.map((a) => a.ability.name).join(", ")}</span>
      </p>
    </div>
  );
};

export default PokemonInfo;
