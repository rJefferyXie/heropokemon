import { PayloadAction } from '@reduxjs/toolkit';
import { CHANGE_ARTWORK, SET_VISITED } from '../types';

const initialState = {
  artwork: "official",
  visited: false
}

const artworkReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case CHANGE_ARTWORK: {
      return {
        ...state,
        artwork: action.payload
      }
    }

    case SET_VISITED: {
      return {
        ...state,
        visited: true
      }
    }

    default: {
      return state;
    }
  }
}

export default artworkReducer;