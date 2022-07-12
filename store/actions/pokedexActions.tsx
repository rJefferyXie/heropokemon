// Types
import { SET_POKEDEX, ADD_ENTRY } from '../types';

// Interfaces
import PokedexMap from '../../interfaces/PokedexMap';

const setPokedex = (pokedex: PokedexMap) => {
  return {
    type: SET_POKEDEX,
    payload: pokedex
  }
}

const addEntry = (pokemon: string) => {
  return {
    type: ADD_ENTRY,
    payload: pokemon
  }
}

export default { setPokedex, addEntry }