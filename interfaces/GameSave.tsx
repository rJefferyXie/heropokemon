// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

interface GameSave {
  "storage": PokemonMap[],
  "team": PokemonMap[],
  "currency": number,
  "badges": string[],
  "floor": number,
  "items": {},
  "experience": number
  "level": number
  "bonusPoints": number
  "bonuses": {}
}

export default GameSave;