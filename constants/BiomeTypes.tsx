interface BiomeMap {
  [key: string]: string[]
}

const BiomeTypes: BiomeMap = {
  "beach": ["water", "flying", "rock", "steel", "fighting"],
  "cave": ["fairy", "fighting", "ghost", "dragon", "dark"],
  "city": ["fighting", "ghost", "electric", "psychic", "steel"],
  "crag": ["poison", "ground", "rock", "psychic", "fairy"],
  "desert": ["fire", "ground", "rock", "steel", "dark"],
  "forest": ["grass", "fairy", "poison", "ghost", "bug"],
  "river": ["water", "flying", "bug", "ice", "grass"],
  "ocean": ["water", "poison", "electric", "dark", "dragon"],
  "savannah": ["fire", "grass", "ice", "dark", "ground"],
  "sky": ["fairy", "flying", "bug", "electric", "dragon"],
  "snow": ["ice", "grass", "ground", "psychic", "flying"],
  "volcano": ["fire", "fighting", "dragon", "steel", "rock"]
}

export default BiomeTypes;