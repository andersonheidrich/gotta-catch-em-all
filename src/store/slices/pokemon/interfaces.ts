import type { PokemonData } from "@/types/pokemon";

export interface PokemonState {
  pokemonList: PokemonData[];
  evolutions: string[];
  visibleCount: number;
  loading: boolean;
  error: string | null;
}
