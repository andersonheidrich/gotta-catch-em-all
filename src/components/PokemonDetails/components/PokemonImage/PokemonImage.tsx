import type { PokemonImageProps } from "./interfaces";

const PokemonImage = ({ src, alt, background }: PokemonImageProps) => {
  return (
    <div className="flex w-[600px] justify-center items-center">
      <img
        className="flex w-[400px] h-[400px] rounded-[8px]"
        style={{ background }}
        src={src}
        alt={alt}
      />
    </div>
  );
};

export default PokemonImage;
