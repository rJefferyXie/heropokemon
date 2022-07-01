import PokedexMap from './PokedexMap';

interface GameSave {
  "team": {},
  "items": {},
  "storage": {},
  "floor": number,
  "badges": string[],
  "currency": number,
  "pokedex": PokedexMap
}

export default GameSave;