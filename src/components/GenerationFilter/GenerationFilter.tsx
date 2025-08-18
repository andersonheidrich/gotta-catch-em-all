import type { GenerationFilterProps } from "./interfaces";

const GenerationFilter = ({ selectedGen, onChange }: GenerationFilterProps) => {
  const numberOfGenerations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="mb-6 flex gap-2 flex-wrap justify-center">
      <button
        onClick={() => onChange("all")}
        className={`cursor-pointer px-4 py-2 rounded-lg shadow-sm font-bold ${
          selectedGen === "all"
            ? "bg-yellow-400 text-black"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        All
      </button>

      {numberOfGenerations.map((gen) => (
        <button
          key={gen}
          onClick={() => onChange(gen)}
          className={`cursor-pointer px-4 py-2 rounded-lg shadow-sm font-bold ${
            selectedGen === gen
              ? "bg-yellow-400 text-black"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Gen {gen}
        </button>
      ))}
    </div>
  );
};

export default GenerationFilter;
