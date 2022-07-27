// Types
import { PayloadAction } from '@reduxjs/toolkit';
import {
  SET_BIOMES,
  SET_ACTIVE_BIOME
} from '../types';

const initialState = {
  activeBiome: '',
  biomes: []
}

const biomeReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case SET_BIOMES: {
      return {
        ...state,
        biomes: action.payload
      }
    }

    case SET_ACTIVE_BIOME: {
      return {
        ...state,
        activeBiome: action.payload
      }
    }

    default: {
      return state;
    }
  }
}

export default biomeReducer;