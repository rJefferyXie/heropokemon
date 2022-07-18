// Types
import { 
  SET_CURRENT_FLOOR,
  SET_HIGHEST_FLOOR,
  SET_CURRENCY,
  SET_BADGES
} from '../types';

const setCurrency = (currency: number) => {
  return {
    type: SET_CURRENCY,
    payload: currency
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
  setBadges
}