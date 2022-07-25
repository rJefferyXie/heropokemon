// Types
import { 
  SET_UNLOCK_POINTS,
  SET_CURRENT_FLOOR,
  SET_HIGHEST_FLOOR,
  SET_GAME_BEATEN,
  SET_CURRENCY,
  SET_BADGES
} from '../types';

const setUnlockPoints = (points: number) => {
  return {
    type: SET_UNLOCK_POINTS,
    payload: points
  }
}

const setGameBeaten = (beaten: boolean) => {
  return {
    type: SET_GAME_BEATEN,
    payload: beaten
  }
}

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
  setUnlockPoints,
  setCurrentFloor,
  setHighestFloor,
  setGameBeaten,
  setCurrency,
  setBadges
}