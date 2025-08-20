import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./page/Home";
import {
  Footer,
  Header,
  Pokedex,
  PokemonDetails,
  PokemonList,
} from "./components";
import ScrollToTop from "./components/ScrollToTop";

const AppRoutes = () => {
  const location = useLocation();

  const hideHeaderOn = ["/"];

  const shouldHideHeader = hideHeaderOn.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/pokemon-list" element={<PokemonList />} />
        <Route path="/:name" element={<PokemonDetails />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;
