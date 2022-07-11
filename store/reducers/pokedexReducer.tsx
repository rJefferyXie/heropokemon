// Types
import { PayloadAction } from '@reduxjs/toolkit';
import { SET_POKEDEX } from '../types';

const initialState = {
  pokedex: {}
}

const pokedexReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case SET_POKEDEX: {
      return {
        ...state,
        pokedex: action.payload
      }
    }

    default: {
      return state;
    }
  }
}

export default pokedexReducer;