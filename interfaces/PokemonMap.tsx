interface PokemonSprites {
  [key: string]: string
}

interface PokemonMap {
  name: string,
  height: number,
  weight: number,
  level: number,
  evolves_from: string,
  is_mythical: boolean,
  is_legendary: boolean,
  stats: number[],
  statBoosts: number[],
  types: string[],
  evolutions: string[],
  sprites: PokemonSprites
}

export default PokemonMap;