import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAllPokemon } from "@/store/slices/pokemonSlice";
import { getTypeColor } from "../../utils";

import {
  PokemonHeader,
  PokemonImage,
  PokemonInfo,
  PokemonStats,
  PokemonTypes,
} from "./components";

const PokemonDetails = () => {
  const { name } = useParams();
  const dispatch = useAppDispatch();

  const { pokemonList, loading, error } = useAppSelector(
    (state) => state.pokemon
  );

  useEffect(() => {
    if (pokemonList.length === 0) {
      dispatch(fetchAllPokemon("all"));
    }
  }, [dispatch, pokemonList.length]);

  const pokemon = pokemonList.find((p) => p.name === name);

  if (loading) {
    return (
      <p className="flex h-full justify-center items-center">
        Carregando Pokémon...
      </p>
    );
  }

  if (error || !pokemon) {
    return (
      <p className="flex h-full justify-center items-center">
        Erro ao carregar Pokémon.
      </p>
    );
  }

  const typeColor = getTypeColor(pokemon.types[0].type.name);

  return (
    <div className="flex flex-col w-full lg:h-full justify-center items-center pt-[124px] lg:pt-[0] pb-[32px] lg:pb-[0]">
      <div className="p-[4px] md:p-[16px] rounded-[8px]">
        <PokemonHeader id={pokemon.id} name={pokemon.name} />
        <div className="flex flex-col lg:flex-row w-full justify-center items-center gap-[16px]">
          <PokemonImage
            src={pokemon.sprite}
            alt={pokemon.name}
            background={typeColor}
          />
          <div className="flex w-[300px] md:w-[440px] justify-center items-center">
            <div className="flex flex-col w-full justify-between h-auto md:h-[440px]">
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
