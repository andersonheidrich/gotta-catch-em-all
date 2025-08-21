import { useEffect, useState } from "react";
import PokeArrow from "../../images/pokeArrow.png";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 600) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed min-[800px]:bottom-3 min-[800px]:right-3 min-[800px]:p-3 rounded-full bg-white hover:bg-red-700 transition cursor-pointer"
        >
          <img src={PokeArrow} className="w-8 h-8" loading="lazy" />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
