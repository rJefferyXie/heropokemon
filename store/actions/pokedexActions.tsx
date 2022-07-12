// Types
import { SET_POKEDEX } from '../types';

// Interfaces
import PokedexMap from '../../interfaces/PokedexMap';

const setPokedex = (pokedex: PokedexMap) => {
  return {
    type: SET_POKEDEX,
    payload: pokedex
  }
}

export default { setPokedex }