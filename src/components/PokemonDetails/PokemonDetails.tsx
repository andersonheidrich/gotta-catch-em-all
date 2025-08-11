import { useParams } from "react-router-dom";
import { getTypeColor } from "../../utils";
import { usePokemon } from "@/hooks";

import {
  PokemonHeader,
  PokemonImage,
  PokemonInfo,
  PokemonNavigation,
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
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col w-[860px] h-[680px]">
        <PokemonNavigation />
        <PokemonHeader id={pokemon.id} name={pokemon.name} />
        <div className="flex w-full h-[800px]">
          <PokemonImage
            src={pokemon.sprite}
            alt={pokemon.name}
            background={typeColor}
          />
          <div className="flex w-[600px] justify-center items-center">
            <div className="flex flex-col h-[400px] justify-between">
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
