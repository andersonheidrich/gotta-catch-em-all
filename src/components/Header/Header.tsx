import { NavLink } from "react-router-dom";

const Header = () => {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/pokedex", label: "Pokédex" },
    { to: "/pokemon-list", label: "Pokémon List" },
    // { to: "/contato", label: "Contato" },
  ];

  // const linkClass = "hover:text-gray-300 transition-colors duration-200";

  // const activeClass = "text-yellow-400 font-semibold";

  return (
    <header>
      <div
        className="flex w-screen h-[90px] justify-center items-center fixed z-[1000] text-[#3b4cca] bg-[#ffffff] border-b-[4px] border-b-[#ffde00]"
        style={{ fontWeight: "bold" }}
      >
        <nav>
          <ul className="flex w-[400px] justify-between">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
