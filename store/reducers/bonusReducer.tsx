// Types
import { PayloadAction } from '@reduxjs/toolkit';
import { SET_BONUSES, SET_BONUS_POINTS, SET_EXPERIENCE, SET_LEVEL } from '../types';

const initialState = {
  bonuses: {},
  bonusPoints: 0,
  experience: 0,
  level: 1
}

const bonusReducer = (state = initialState, action: PayloadAction<any>) => {
  switch (action.type) {
    case SET_BONUSES: {
      return {
        ...state,
        bonuses: action.payload
      }
    }

    case SET_BONUS_POINTS: {
      return {
        ...state,
        bonusPoints: action.payload
      }
    }

    case SET_EXPERIENCE: {
      return {
        ...state,
        experience: action.payload
      }
    }

    case SET_LEVEL: {
      return {
        ...state,
        level: action.payload
      }
    }

    default: {
      return state;
    }
  }
}

export default bonusReducer;