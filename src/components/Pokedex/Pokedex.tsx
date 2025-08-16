import { useAllPokemon } from "@/hooks";
import PokemonCard from "./PokemonCard";
import "./styles.css";

const Pokedex = () => {
  // const [selectedGen, setSelectedGen] = useState(1);
  const { pokemonList, loading, error, visibleCount, loadMoreRef, hasMore } =
    useAllPokemon(1);

  const visiblePokemon = pokemonList.slice(0, visibleCount);

  // const numberOfGenerations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (loading)
    return (
      <p className="flex h-full justify-center items-center">Carregando...</p>
    );

  if (error)
    return (
      <p className="flex h-full justify-center items-center">Erro: {error}</p>
    );

  return (
    <div className="flex pt-[154px] pb-[64px] justify-center items-center bg-black">
      <div className="pokedex-grid bg-white rounded-[8px]">
        {visiblePokemon.map((poke) => (
          <div key={poke.name} className="w-[200px]">
            <PokemonCard
              key={poke.name}
              id={poke.id}
              name={poke.name}
              sprite={poke.sprite}
              types={poke.types}
            />
          </div>
        ))}
        {hasMore && <div ref={loadMoreRef} />}
      </div>
    </div>
  );
};

export default Pokedex;
