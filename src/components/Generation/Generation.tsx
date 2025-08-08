// import { useState } from "react";
import { useGeneration } from "../../hooks";
import PokemonCard from "./PokemonCard";

const Generation = () => {
  // const [selectedGen, setSelectedGen] = useState(1);
  const { pokemonList } = useGeneration(1);

  // const numberOfGenerations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const capitalizeWords = (str: string) => {
    return str
      .toLowerCase() // para evitar letras maiúsculas no meio da palavra
      .split(" ") // separa as palavras
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitaliza
      .join(" "); // junta novamente em uma string
  };

  return (
    <div className="grid grid-cols-[repeat(6,200px)] py-[64px] place-items-center gap-[16px] justify-center items-center bg-[#ffffff]">
      {pokemonList.map((poke) => (
        <PokemonCard
          key={poke.name}
          id={poke.id}
          name={capitalizeWords(poke.name)}
          sprite={poke.sprite}
          types={poke.types}
        />
      ))}
    </div>
  );
};

export default Generation;
