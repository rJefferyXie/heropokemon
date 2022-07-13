// Interfaces
import PokedexMap from './PokedexMap';
import PokemonMap from '../interfaces/PokemonMap';

interface GameSave {
  "storage": PokemonMap[],
  "pokedex": PokedexMap,
  "team": PokemonMap[],
  "currency": number,
  "badges": string[],
  "floor": number,
  "items": {}
}

export default GameSave;