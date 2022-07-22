// Types
import { PayloadAction } from '@reduxjs/toolkit';
import { SET_PLAYER_DPS } from '../types';

const initialState = {
  playerDPS: 1
}

const damageReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case SET_PLAYER_DPS: {
      return {
        ...state,
        playerDPS: action.payload
      }
    }

    default: {
      return state;
    }
  }
}

export default damageReducer;