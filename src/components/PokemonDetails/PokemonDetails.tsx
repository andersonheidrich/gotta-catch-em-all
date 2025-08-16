import { useParams } from "react-router-dom";
import { getTypeColor } from "../../utils";
import { usePokemon } from "@/hooks";

import {
  PokemonHeader,
  PokemonImage,
  PokemonInfo,
  PokemonStats,
  PokemonTypes,
} from "./components";

const PokemonDetails = () => {
  const { name } = useParams();
  const { pokemon, loading, error } = usePokemon(name!);

  if (loading) {
    return <p className="text-center mt-8">Carregando...</p>;
  }

  if (error || !pokemon) {
    return (
      <p className="text-center mt-8 text-red-500">Erro ao carregar Pokémon.</p>
    );
  }

  const typeColor = getTypeColor(pokemon.types[0].type.name);

  return (
    <div className="flex flex-col w-full lg:h-full justify-center items-center bg-black pt-[124px] lg:pt-[0] pb-[32px] lg:pb-[0]">
      <div className="bg-white p-[4px] md:p-[16px] rounded-[8px]">
        <PokemonHeader id={pokemon.id} name={pokemon.name} />
        <div className="flex flex-col lg:flex-row w-full justify-center items-center gap-[16px]">
          <PokemonImage
            src={pokemon.sprite}
            alt={pokemon.name}
            background={typeColor}
          />
          <div className="flex w-[300px] md:w-[420px] justify-center items-center">
            <div className="flex flex-col w-full justify-between">
              <PokemonStats stats={pokemon.stats} />
              <PokemonTypes types={pokemon.types} />
              <PokemonInfo
                height={pokemon.height}
                weight={pokemon.weight}
                abilities={pokemon.abilities}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
