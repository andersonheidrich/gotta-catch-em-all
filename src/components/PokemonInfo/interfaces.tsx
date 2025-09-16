interface Ability {
  ability: { name: string };
}

export interface PokemonInfoProps {
  height: number;
  weight: number;
  abilities: Ability[];
}
