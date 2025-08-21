import { useLocation, useNavigate } from "react-router-dom";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: t("navbar.menu.home"),
      path: "/",
      icon: <CatchingPokemonIcon />,
      activeClasses: "bg-gray-400 text-white border-b-gray-400",
      baseClasses:
        "border-b-gray-400 hover:bg-gray-400 hover:text-white transition-colors duration-300",
    },
    {
      label: t("navbar.menu.pokedex"),
      path: "/pokedex",
      icon: <SmartphoneIcon />,
      activeClasses: "bg-red-600 text-white border-b-red-600",
      baseClasses:
        "border-b-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300",
    },
    {
      label: t("navbar.menu.pokemonList"),
      path: "/pokemon-list",
      icon: <ListAltIcon />,
      activeClasses: "bg-yellow-500 text-white border-b-yellow-500",
      baseClasses:
        "border-b-yellow-500 hover:bg-yellow-500 hover:text-white transition-colors duration-300",
    },
  ];

  return (
    <header className="flex w-screen h-[90px] justify-center items-center fixed z-[1000] bg-white border-b-[4px] border-b-gray-300 font-bold gap-2">
      <nav className="flex w-[320px] h-[94px]">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.path}
              className={`flex flex-col w-[107px] justify-center items-center cursor-pointer border-b-4 ${
                isActive ? item.activeClasses : item.baseClasses
              }`}
              aria-label={item.label}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
