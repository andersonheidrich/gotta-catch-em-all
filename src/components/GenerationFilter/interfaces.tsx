export interface GenerationFilterProps {
  selectedGen: number | "all";
  onChange: (gen: number | "all") => void;
}
