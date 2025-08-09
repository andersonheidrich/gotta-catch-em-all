import { useParams } from "react-router-dom";
import { getTypeColor } from "../../utils";
import { usePokemon } from "../../hooks/usePokemon";
import Button from "../Button";

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

  // quebrar em vários componentes

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="flex flex-col w-[860px] h-[680px]">
        {/* navegação */}
        <div className="flex w-full h-[60px] justify-between items-center">
          <Button className="">Back</Button>
          <Button className="">Next</Button>
        </div>
        {/* id e nome */}
        <div className="flex w-full h-[60px] justify-center items-center px-[64px]">
          <h1 className="flex capitalize">
            #{pokemon.id.toString().padStart(4, "0")} {pokemon.name}
          </h1>
        </div>
        {/* Coluna da imagem */}
        <div className="flex w-full h-[800px]">
          {/* CHAMAR O POKEMONIMAGE AQUI */}
          <div className="flex w-[600px] justify-center items-center">
            <img
              className="flex w-[400px] h-[400px] bg-[#F2F2F2] rounded-[8px]"
              src={pokemon.sprite}
              alt={pokemon.name}
            />
          </div>
          {/* Coluna das informações */}
          <div className="flex w-[600px] justify-center items-center">
            <div className="flex flex-col h-[400px] justify-between">
              {/* status */}
              <div className="flex flex-col w-[400px] h-[200px] bg-[#A4A4A4] rounded-[8px] px-[16px] py-[8px]">
                <h2 className="w-full mb-[16px]">Stats</h2>
                <div>
                  {pokemon.stats.map((s) => (
                    <h4 key={s.stat.name} className="mb-[2px] capitalize">
                      {s.stat.name}: {s.base_stat}
                    </h4>
                  ))}
                </div>
              </div>
              {/* types */}
              <div className="flex flex-col">
                <h2 className="mb-[16px]">Type</h2>
                <div className="flex w-full gap-x-[16px] capitalize">
                  {pokemon.types.map((poke) => (
                    <span
                      key={poke.type.name}
                      className="px-[32px] py-[8px] rounded-[8px] gap-x-[16px"
                      style={{ backgroundColor: getTypeColor(poke.type.name) }}
                    >
                      {poke.type.name}
                    </span>
                  ))}
                </div>
              </div>
              {/* outras infos */}
              <div className="bg-[#30a7d7] rounded-[8px] px-[16px] py-[8px]">
                <p className="mb-[4px]">
                  Altura: <span className="">{pokemon.height / 10} m</span>
                </p>
                <p className="mb-[4px]">
                  Peso: <span className="">{pokemon.weight / 10} kg</span>
                </p>
                <p className="">
                  Habilidades:
                  <span className="">
                    {pokemon.abilities.map((a) => a.ability.name).join(", ")}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
