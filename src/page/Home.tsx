import { Pokeball } from "@/components";
import GottaCatchEmAll from "../images/gottacatchemall.png";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-[#ffde00]">
      <img src={GottaCatchEmAll} className="w-[280px] md:w-[400px] h-auto" />
      <Pokeball />
    </div>
  );
};

export default Home;
