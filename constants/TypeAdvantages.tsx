interface TypeMap {
  [key: string]: {
    [key: string]: string[]
  }
}

const TypeAdvantages: TypeMap = {
  "normal": {
    "strong": [],
    "weak": ["rock", "steel"],
    "resist": ["ghost"]
  },
  "fighting": {
    "strong": ["normal", "rock", "steel", "ice", "dark"],
    "weak": ["flying", "poison", "bug", "psychic", "fairy"],
    "resist": ["ghost"]
  },
  "flying": {
    "strong": ["fighting", "bug", "grass"],
    "weak": ["rock", "steel", "electric"],
    "resist": []
  },
  "poison": {
    "strong": ["grass", "fairy"],
    "weak": ["poison", "ground", "rock", "ghost"],
    "resist": ["steel"]
  },
  "ground": {
    "strong": ["poison", "rock", "steel", "fire", "electric"],
    "weak": ["bug", "grass"],
    "resist": ["flying"]
  },
  "rock": {
    "strong": ["flying", "bug", "fire", "ice"],
    "weak": ["fighting", "ground", "steel"],
    "resist": []
  },
  "bug": {
    "strong": ["grass", "psychic", "dark"],
    "weak": ["fighting", "flying", "poison", "ghost", "steel", "fire", "fairy"],
    "resist": []
  },
  "ghost": {
    "strong": ["ghost", "psychic"],
    "weak": ["dark"],
    "resist": ["normal"]
  },
  "steel": {
    "strong": ["rock", "ice", "fairy"],
    "weak": ["steel", "fire", "water", "electric"],
    "resist": []
  },
  "fire": {
    "strong": ["bug", "steel", "grass", "ice"],
    "weak": ["rock", "fire", "water", "dragon"],
    "resist": []
  },
  "water": {
    "strong": ["ground", "rock", "fire"],
    "weak": ["water", "grass", "dragon"],
    "resist": []
  },
  "grass": {
    "strong": ["ground", "rock", "water"],
    "weak": ["flying", "poison", "bug", "steel", "fire", "grass", "dragon"],
    "resist": []
  },
  "electric": {
    "strong": ["flying", "water"],
    "weak": ["grass", "electric", "dragon"],
    "resist": ["ground"]
  },
  "psychic": {
    "strong": ["fighting", "poison"],
    "weak": ["steel", "psychic"],
    "resist": ["dark"]
  },
  "ice": {
    "strong": ["flying", "ground", "grass", "dragon"],
    "weak": ["steel", "fire", "water", "ice"],
    "resist": []
  },
  "dragon": {
    "strong": ["dragon"],
    "weak": ["steel"],
    "resist": ["fairy"]
  },
  "dark": {
    "strong": ["ghost", "psychic"],
    "weak": ["fighting", "dark", "fairy"],
    "resist": []
  },
  "fairy": {
    "strong": ["fighting", "dragon", "dark"],
    "weak": ["poison", "steel", "fire"],
    "resist": []
  }
}

export default TypeAdvantages;