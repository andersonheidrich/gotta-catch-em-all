import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { PokemonHeaderProps } from "./interfaces";
import Button from "@/components/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAllPokemon } from "@/store/slices/pokemon";

const PokemonHeader = ({ id, name }: PokemonHeaderProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pokemonList } = useAppSelector((state) => state.pokemon);

  useEffect(() => {
    if (pokemonList.length === 0) {
      dispatch(fetchAllPokemon("all"));
    }
  }, [dispatch, pokemonList.length]);

  const currentIndex = pokemonList.findIndex((p) => p.id === id);

  const prevPokemon =
    currentIndex > 0
      ? pokemonList[currentIndex - 1]
      : pokemonList[pokemonList.length - 1];

  const nextPokemon =
    currentIndex < pokemonList.length - 1
      ? pokemonList[currentIndex + 1]
      : pokemonList[0];

  const formattedId = `Nº ${id.toString().padStart(4, "0")}`;

  const handlePrev = () => {
    if (prevPokemon) navigate(`/${prevPokemon.name}`);
  };

  const handleNext = () => {
    if (nextPokemon) navigate(`/${nextPokemon.name}`);
  };

  return (
    <div className="flex flex-col w-[300px] md:w-[536px] lg:w-full h-[128px] justify-between items-center font-bold capitalize mb-[16px]">
      <div className="flex w-full gap-x-[32px] lg:gap-x-[208px]">
        <Button
          className="flex rounded-[8px] justify-end text-[18px] lg:text-[24px] capitalize text-white bg-[#2b2b2b] [clip-path:polygon(15%_0,100%_0,100%_100%,15%_100%,0_50%)] hover:scale-105 transition-transform"
          onClick={handlePrev}
        >
          <span className="mr-2 md:mr-4">{`Nº ${prevPokemon?.id
            .toString()
            .padStart(4, "0")}`}</span>
          <span className="hidden md:inline mr-2">{prevPokemon?.name}</span>
        </Button>
        <Button
          className="flex rounded-[8px] text-[18px] lg:text-[24px] capitalize text-white bg-[#2b2b2b] [clip-path:polygon(0_0,85%_0,100%_50%,85%_100%,0_100%)] hover:scale-105 transition-transform"
          onClick={handleNext}
        >
          <span className="hidden md:inline ml-2">{nextPokemon?.name}</span>
          <span className="ml-2 md:ml-4">{`Nº ${nextPokemon?.id
            .toString()
            .padStart(4, "0")}`}</span>
        </Button>
      </div>
      <div className="text-[24px] md:text-[28px] lg:text-[32px]">
        {formattedId} {name}
      </div>
    </div>
  );
};

export default PokemonHeader;
