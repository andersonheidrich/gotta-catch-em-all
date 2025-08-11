import { Button } from "@/components";

const PokemonNavigation = () => {
  return (
    <div className="flex w-full h-[60px] justify-between items-center">
      <Button>Back</Button>
      <Button>Next</Button>
    </div>
  );
};

export default PokemonNavigation;
