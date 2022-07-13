// Types
import { PayloadAction } from '@reduxjs/toolkit';
import { SET_CLICK_DAMAGE, SET_PLAYER_DPS } from '../types';

const initialState = {
  clickDamage: 1,
  playerDPS: 1
}

const damageReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case SET_CLICK_DAMAGE: {
      return {
        ...state,
        clickDamage: action.payload
      }
    }

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