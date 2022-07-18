// Types
import { PayloadAction } from '@reduxjs/toolkit';
import { SET_STORAGE } from '../types';

const initialState = {
  storage: []
}

const storageReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case SET_STORAGE: {
      return {
        ...state,
        storage: action.payload
      }
    }

    default: {
      return state;
    }
  }
}

export default storageReducer;