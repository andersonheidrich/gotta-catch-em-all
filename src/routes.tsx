import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import { PokemonDetails } from "./components";

const AppRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:name" element={<PokemonDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
