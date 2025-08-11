import type { PokemonHeaderProps } from "./interfaces";

const PokemonHeader = ({ id, name }: PokemonHeaderProps) => {
  return (
    <div className="flex w-full h-[60px] justify-center items-center px-[64px]">
      <h1 className="flex capitalize">
        #{id.toString().padStart(4, "0")} {name}
      </h1>
    </div>
  );
};

export default PokemonHeader;
