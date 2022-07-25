// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

interface GameSave {
  "storage": PokemonMap[],
  "team": PokemonMap[],
  "currency": number,
  "badges": string[],
  "floor": number,
  "highestFloor": number,
  "items": {},
  "experience": number,
  "level": number,
  "bonusPoints": number,
  "bonuses": {},
  "gameBeaten": boolean
}

export default GameSave;