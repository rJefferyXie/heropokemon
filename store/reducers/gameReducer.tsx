// Types
import { PayloadAction } from '@reduxjs/toolkit';
import { 
  SET_CURRENT_FLOOR,
  SET_HIGHEST_FLOOR,
  SET_ENEMIES_LEFT,
  SET_CLICK_DAMAGE, 
  SET_PLAYER_DPS,
  SET_CURRENCY,
  SET_STORAGE,
  SET_BADGES,
  SET_ALERTS,
  SET_ITEMS,
  SET_ENEMY,
  SET_TEAM
} from '../types';

const initialState = {
  currentFloor: 1,
  highestFloor: 1,
  enemiesLeft: 10,
  clickDamage: 1,
  playerDPS: 1,
  currency: 0,
  storage: [],
  badges: [],
  alerts: [],
  items: {},
  team: []
}

const gameReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case SET_CLICK_DAMAGE: {
      return {
        ...state,
        click: action.payload
      }
    }

    case SET_PLAYER_DPS: {
      return {
        ...state,
        playerDPS: action.payload
      }
    }

    case SET_CURRENCY: {
      return {
        ...state,
        currency: action.payload
      }
    }

    case SET_ENEMIES_LEFT: {
      return {
        ...state,
        enemiesLeft: action.payload
      }
    }

    case SET_TEAM: {
      return {
        ...state,
        team: action.payload
      }
    }

    case SET_STORAGE: {
      return {
        ...state,
        storage: action.payload
      }
    }

    case SET_ITEMS: {
      return {
        ...state,
        items: action.payload
      }
    }

    case SET_BADGES: {
      return {
        ...state,
        badges: action.payload
      }
    }

    case SET_CURRENT_FLOOR: {
      return {
        ...state,
        currentFloor: action.payload
      }
    }

    case SET_HIGHEST_FLOOR: {
      return {
        ...state,
        highestFloor: action.payload
      }
    }

    case SET_ALERTS: {
      return {
        ...state,
        alerts: [...state.alerts, action.payload]
      }
    }

    default: {
      return state;
    }
  }
}

export default gameReducer;