export interface PokemonData {
  id: number;
  name: string;
  sprite: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  url: string;
}
