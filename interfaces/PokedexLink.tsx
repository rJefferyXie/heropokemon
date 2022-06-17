interface PokedexLink {
  entry_number: number,
  pokemon_species: {
    name: string,
    url: string
  }
}

export default PokedexLink;