interface Stat {
  base_stat: number;
  stat: { name: string };
}

export interface PokemonStatsProps {
  stats: Stat[];
}
