// Types
import { PayloadAction } from '@reduxjs/toolkit';
import { UNLOCK_REGION, SET_REGION } from '../types';

const initialState = {
  regions: ["kanto"], 
  selected: ''
}

const pokedexReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case UNLOCK_REGION: {
      return {
        ...state,
        regions: [...state.regions, action.payload]
      }
    }

    case SET_REGION: {
      return {
        ...state, 
        selected: action.payload
      }
    }

    default: {
      return state;
    }
  }
}

export default pokedexReducer;