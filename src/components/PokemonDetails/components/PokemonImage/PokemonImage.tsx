import type { PokemonImageProps } from "./interfaces";

const PokemonImage = ({ src, alt, background }: PokemonImageProps) => {
  return (
    <img
      className="flex w-[300] md:w-[420px] h-[300px] md:h-[420px] rounded-[8px]"
      style={{ background }}
      src={src}
      alt={alt}
    />
  );
};

export default PokemonImage;
