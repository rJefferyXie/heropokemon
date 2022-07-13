// Types
import { PayloadAction } from '@reduxjs/toolkit';
import { 
  SET_CURRENT_FLOOR,
  SET_HIGHEST_FLOOR,
  SET_CURRENCY,
  SET_STORAGE,
  SET_BADGES,
  SET_ITEMS
} from '../types';

const initialState = {
  currentFloor: 1,
  highestFloor: 1,
  currency: 0,
  storage: [],
  badges: [],
  items: {}
}

const gameReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case SET_CURRENCY: {
      return {
        ...state,
        currency: action.payload
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

    default: {
      return state;
    }
  }
}

export default gameReducer;