// Types
import { SET_STORAGE } from '../types';

// Interfaces
import PokemonMap from '../../interfaces/PokemonMap';

const setStorage = (storage: PokemonMap[]) => {
  return {
    type: SET_STORAGE,
    payload: storage
  }
}

export default { setStorage }
