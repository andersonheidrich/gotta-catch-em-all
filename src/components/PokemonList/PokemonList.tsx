import { useAllPokemon } from "@/hooks";
import PokemonRow from "./PokemonRow";

const PokemonList = () => {
  const { pokemonList } = useAllPokemon(1);

  return (
    <div className="flex flex-col pt-[154px] pb-[64px] justify-center items-center bg-[#ffffff]">
      {pokemonList.map((poke) => (
        <PokemonRow
          key={poke.name}
          id={poke.id}
          name={poke.name}
          sprite={poke.sprite}
          types={poke.types}
          stats={poke.stats}
        />
      ))}
    </div>
  );
};

export default PokemonList;
