// Types
import { 
  SET_CURRENT_FLOOR,
  SET_HIGHEST_FLOOR,
  SET_CURRENCY,
  SET_STORAGE,
  SET_BADGES,
  SET_ITEMS
} from '../types';

// Interfaces
import PokemonMap from '../../interfaces/PokemonMap';

const setCurrency = (currency: number) => {
  return {
    type: SET_CURRENCY,
    payload: currency
  }
}

const setStorage = (storage: PokemonMap[]) => {
  return {
    type: SET_STORAGE,
    payload: storage
  }
}

const setItems = (items: {}) => {
  return {
    type: SET_ITEMS,
    payload: items
  }
}

const setBadges = (badges: string[]) => {
  return {
    type: SET_BADGES,
    payload: badges
  }
}

const setCurrentFloor = (floor: number) => {
  return {
    type: SET_CURRENT_FLOOR,
    payload: floor
  }
}

const setHighestFloor = (floor: number) => {
  return {
    type: SET_HIGHEST_FLOOR,
    payload: floor
  }
}

export default { 
  setCurrentFloor,
  setHighestFloor,
  setCurrency,
  setStorage,
  setBadges,
  setItems
}