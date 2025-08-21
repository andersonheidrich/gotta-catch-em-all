import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./page/Home";
import {
  Footer,
  Header,
  Pokedex,
  PokemonDetails,
  PokemonList,
  ScrollToTop,
  ScrollToTopButton,
} from "./components";

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
      <ScrollToTopButton />
      <Footer />
    </>
  );
};

export default AppRoutes;
