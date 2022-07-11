// Types
import { PayloadAction } from '@reduxjs/toolkit';
import { ADD_REGION } from '../types';

const initialState = {
  regions: ["kanto"]
}

const pokedexReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case ADD_REGION: {
      return {
        ...state,
        regions: [...state.regions, action.payload]
      }
    }

    default: {
      return state;
    }
  }
}

export default pokedexReducer;