import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPokemonEvolution } from "@/store/slices/pokemon";
import type { PokemonEvolutionsProps } from "./interfaces";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getTypeColor } from "@/utils";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PokemonEvolutions = ({ name }: PokemonEvolutionsProps) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { evolutions, pokemonList, loading } = useAppSelector(
    (state) => state.pokemon
  );

  useEffect(() => {
    if (name) {
      dispatch(fetchPokemonEvolution(name));
    }
  }, [dispatch, name]);

  if (loading && evolutions.length === 0) {
    return (
      <p className="flex w-full min-h-[312px] items-center justify-center">
        {t("loading")}
      </p>
    );
  }

  if (evolutions.length === 0) {
    return (
      <div className="flex w-full min-h-[312px] items-center justify-center">
        <p>{t("loading")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full p-2 mt-4 items-center bg-[#505050] rounded-[8px] justify-center text-white">
      <h2 className="text-xl font-bold mb-4">
        {t("pokemonDetails.evolutions")}
      </h2>
      <div className="flex flex-col flex-wrap md:flex-row w-full justify-center items-center">
        {evolutions.map((evoName, i) => {
          const evo = pokemonList.find((p) => p.name === evoName);
          return (
            evo && (
              <div key={evo.id} className="flex">
                <div className="flex flex-col justify-center items-center mb-3">
                  <div className="flex justify-center items-center">
                    <div
                      className="flex w-40 h-40 justify-center items-center rounded-full border-4 border-white cursor-pointer hover:scale-105 transition-transform"
                      style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.8)" }}
                      onClick={() => navigate(`/${evo.name}`)}
                    >
                      <img
                        src={evo.sprite}
                        alt={evo.name}
                        className="w-32 h-32"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center capitalize mt-2 gap-2 font-bold">
                    <div className="flex gap-2">
                      <span>{evo.name}</span>
                      <span>{`Nº ${evo.id.toString().padStart(4, "0")}`}</span>
                    </div>
                    <div className="flex gap-1">
                      {evo.types.map((t) => (
                        <span
                          key={t.type.name}
                          className="px-2 py-1 rounded text-white text-xs"
                          style={{ backgroundColor: getTypeColor(t.type.name) }}
                        >
                          {t.type.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  {i < evolutions.length - 1 && (
                    <span className="block md:hidden my-2 text-white justify-center items-center">
                      <ArrowForwardIosIcon className="rotate-90" />
                    </span>
                  )}
                </div>
                {i < evolutions.length - 1 && (
                  <span className="hidden md:flex justify-center items-center mb-14 lg:mx-5 text-white">
                    <ArrowForwardIosIcon />
                  </span>
                )}
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default PokemonEvolutions;
