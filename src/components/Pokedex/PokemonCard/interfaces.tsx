export interface PokemonCardProps {
  id: number;
  name: string;
  sprite: string;
  types: { type: { name: string } }[];
}
