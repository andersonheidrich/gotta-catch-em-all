import { NavLink } from "react-router-dom";

const Header = () => {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/pokedex", label: "Pokédex" },
    { to: "/pokemon-list", label: "Pokémon List" },
  ];

  // const linkClass = "hover:text-gray-300 transition-colors duration-200";

  // const activeClass = "text-yellow-400 font-semibold";

  return (
    <header
      className="flex w-screen h-[90px] justify-center items-center fixed z-[1000] text-[#3b4cca] bg-[#ffffff] border-b-[4px] border-b-[#3b4cca]"
      style={{ fontWeight: "bold" }}
    >
      <nav className="flex w-[320px]">
        <ul className="flex w-full justify-around">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
