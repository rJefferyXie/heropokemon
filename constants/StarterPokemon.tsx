interface StarterMap {
  [key: string]: string[]
}

const StarterPokemon: StarterMap = {
  "kanto": ["bulbasaur", "charmander", "squirtle"],
  "johto": ["ivysaur", "charmeleon", "wartortle"],
  "hoenn": ["venusaur", "charizard", "blastoise"],
  "sinnoh": ["zapdos", "moltres", "articuno"],
  "unova": ["oddish", "vulpix", "poliwag"],
  "kalos": ["gloom", "ninetales", "poliwhirl"],
  "alola": ["vileplume", "arcanine", "poliwrath"]
}

export default StarterPokemon;