interface PokemonMap {
  name: string,
  height: number,
  weight: number,
  is_mythical: boolean,
  is_legendary: boolean,
  stats: number[],
  types: string[],
  evolutions: string[],
  sprites: {
    dream: string,
    home: string,
    official: string
  }
}

interface PokedexMap {
  [key: string]: PokemonMap
}

export default PokedexMap;