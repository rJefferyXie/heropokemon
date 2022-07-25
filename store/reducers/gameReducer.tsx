// Types
import { PayloadAction } from '@reduxjs/toolkit';
import { 
  SET_UNLOCK_POINTS,
  SET_CURRENT_FLOOR,
  SET_HIGHEST_FLOOR,
  SET_GAME_BEATEN,
  SET_CURRENCY,
  SET_BADGES
} from '../types';

const initialState = {
  gameBeaten: false,
  unlockPoints: 0,
  currentFloor: 1,
  highestFloor: 1,
  currency: 0,
  badges: []
}

const gameReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case SET_UNLOCK_POINTS: {
      return {
        ...state,
        unlockPoints: action.payload
      }
    }

    case SET_GAME_BEATEN: {
      return {
        ...state,
        gameBeaten: action.payload
      }
    }

    case SET_CURRENCY: {
      return {
        ...state,
        currency: action.payload
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

    default: {
      return state;
    }
  }
}

export default gameReducer;