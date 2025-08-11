import type { PokemonInfoProps } from "./interfaces";

const PokemonInfo = ({ height, weight, abilities }: PokemonInfoProps) => {
  return (
    <div className="bg-[#30a7d7] rounded-[8px] px-[16px] py-[8px]">
      <p className="mb-[4px]">
        Altura: <span className="">{height / 10} m</span>
      </p>
      <p className="mb-[4px]">
        Peso: <span className="">{weight / 10} kg</span>
      </p>
      <p className="">
        Habilidades:
        <span className="">
          {abilities.map((a) => a.ability.name).join(", ")}
        </span>
      </p>
    </div>
  );
};

export default PokemonInfo;
