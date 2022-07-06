// Interfaces
import PokedexMap from './PokedexMap';
import PokemonMap from '../interfaces/PokemonMap';

interface GameSave {
  "team": PokemonMap[],
  "items": {},
  "storage": PokemonMap[],
  "floor": number,
  "badges": string[],
  "currency": number,
  "pokedex": PokedexMap
}

export default GameSave;