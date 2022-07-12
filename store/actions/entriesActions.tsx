// Types
import { ADD_ENTRY } from '../types';

const addEntry = (pokemon: string) => {
  return {
    type: ADD_ENTRY,
    payload: pokemon
  }
}

export default { addEntry }