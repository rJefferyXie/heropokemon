interface PokemonSprites {
  [key: string]: string
}

interface PokemonMap {
  name: string,
  height: number,
  weight: number,
  is_mythical: boolean,
  is_legendary: boolean,
  stats: number[],
  types: string[],
  evolutions: string[],
  sprites: PokemonSprites
}

export default PokemonMap;