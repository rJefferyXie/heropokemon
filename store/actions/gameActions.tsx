// Types
import { 
  SET_CURRENT_FLOOR,
  SET_HIGHEST_FLOOR,
  SET_CLICK_DAMAGE, 
  SET_PLAYER_DPS,
  SET_CURRENCY,
  SET_STORAGE,
  SET_BADGES,
  SET_ALERTS,
  SET_ITEMS,
  SET_TEAM
} from '../types';

// Interfaces
import PokemonMap from '../../interfaces/PokemonMap';

const setClickDamage = (damage: number) => {
  return {
    type: SET_CLICK_DAMAGE,
    payload: damage
  }
}

const setPlayerDPS = (dps: number) => {
  return {
    type: SET_PLAYER_DPS,
    payload: dps
  }
}

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

const setTeam = (team: PokemonMap[]) => {
  return {
    type: SET_TEAM,
    payload: team
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

const setAlerts = (alert: string) => {
  return {
    type: SET_ALERTS,
    payload: alert
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
  setClickDamage, 
  setPlayerDPS,
  setCurrency,
  setStorage,
  setBadges,
  setAlerts,
  setItems,
  setTeam
}