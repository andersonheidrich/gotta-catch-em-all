export interface PokemonRowProps {
  id: number;
  name: string;
  sprite: string;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}
