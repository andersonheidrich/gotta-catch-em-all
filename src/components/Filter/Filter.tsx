import type { FilterProps } from "./interfaces";

const Filter = ({ searchTerm, setSearchTerm }: FilterProps) => {
  return (
    <div className="flex w-[300px] mb-4">
      <input
        type="text"
        placeholder="Pesquisar Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-white p-2 rounded border"
      />
    </div>
  );
};

export default Filter;
