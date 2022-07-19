// Types
import { PayloadAction } from '@reduxjs/toolkit';
import { SET_BONUSES, ADD_BONUS_POINTS } from '../types';

const initialState = {
  bonuses: {},
  bonusPoints: 0
}

const bonusReducer = (state = initialState, action: PayloadAction<any>) => {
  switch (action.type) {
    case SET_BONUSES: {
      return {
        ...state,
        bonuses: action.payload
      }
    }

    case ADD_BONUS_POINTS: {
      return {
        ...state,
        bonusPoints: state.bonusPoints + action.payload
      }
    }

    default: {
      return state;
    }
  }
}

export default bonusReducer;