import { PayloadAction } from '@reduxjs/toolkit';
import { CHANGE_ARTWORK } from '../types';

const initialState = {
  artwork: "official"
}

const artworkReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case CHANGE_ARTWORK: {
      return {
        ...state,
        artwork: action.payload
      }
    }

    default: {
      return state;
    }
  }
}

export default artworkReducer;