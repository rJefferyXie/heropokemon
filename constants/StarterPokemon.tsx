interface StarterMap {
  [key: string]: string[]
}

const StarterPokemon: StarterMap = {
  "kanto": ["bulbasaur", "charmander", "squirtle"],
  "johto": ["chikorita", "cyndaquil", "totodile"],
  "hoenn": ["treecko", "torchic", "mudkip"],
  "sinnoh": ["turtwig", "chimchar", "piplup"],
  "unova": ["snivy", "tepig", "oshawott"],
  "kalos": ["chespin", "fennekin", "froakie"],
  "alola": ["rowlet", "litten", "popplio"]
}

export default StarterPokemon;