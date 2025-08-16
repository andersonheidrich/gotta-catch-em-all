import { useNavigate } from "react-router-dom";
import type { PokemonHeaderProps } from "./interfaces";
import Button from "@/components/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useAllPokemon } from "@/hooks";

const PokemonHeader = ({ id, name }: PokemonHeaderProps) => {
  const navigate = useNavigate();
  const { pokemonList } = useAllPokemon(1);

  const currentIndex = pokemonList.findIndex((p) => p.id === id);

  const prevPokemon =
    currentIndex > 0
      ? pokemonList[currentIndex - 1]
      : pokemonList[pokemonList.length - 1];

  const nextPokemon =
    currentIndex < pokemonList.length - 1
      ? pokemonList[currentIndex + 1]
      : pokemonList[0];

  const formattedId = `#${id.toString().padStart(4, "0")}`;

  const handlePrev = () => {
    if (prevPokemon) navigate(`/${prevPokemon.name}`);
  };

  const handleNext = () => {
    if (nextPokemon) navigate(`/${nextPokemon.name}`);
  };

  return (
    <div className="flex flex-col w-full h-[128px] justify-between items-center font-bold capitalize mb-[16px] lg:mb-[32px]">
      <div className="flex w-full gap-x-[32px] lg:gap-x-[256px]">
        <Button
          className="flex text-[18px] lg:text-[24px] capitalize bg-[#555555]"
          onClick={handlePrev}
        >
          <ChevronLeftIcon />
          <span className="mr-[8px] md:mr-[0]">{`#${prevPokemon?.id
            .toString()
            .padStart(4, "0")}`}</span>
          <span className="hidden md:inline mr-[8px]">{prevPokemon?.name}</span>
        </Button>
        <Button
          className="flex items-center text-[18px] lg:text-[24px] capitalize bg-[#555555]"
          onClick={handleNext}
        >
          <span className="hidden md:inline ml-[8px]">{nextPokemon?.name}</span>
          <span className="ml-[8px] md:ml-[0]">{`#${nextPokemon?.id
            .toString()
            .padStart(4, "0")}`}</span>
          <ChevronRightIcon />
        </Button>
      </div>
      <div className="text-[24px] md:text-[28px] lg:text-[32px]">
        {formattedId} {name}
      </div>
    </div>
  );
};

export default PokemonHeader;
