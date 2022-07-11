// Types
import { SET_POKEDEX } from '../types';

// Interfaces
import PokedexMap from '../../interfaces/PokedexMap';

const addPokedex = (pokedex: PokedexMap) => {
  return {
    type: SET_POKEDEX,
    payload: pokedex
  }
}

export default { addPokedex }