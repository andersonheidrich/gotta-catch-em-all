import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import { Pokedex, PokemonDetails } from "./components";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/:name" element={<PokemonDetails />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
