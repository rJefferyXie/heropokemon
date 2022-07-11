// Types
import { PayloadAction } from '@reduxjs/toolkit';
import { SET_VISITED } from '../types';

const initialState = {
  visited: false
}

const visitedReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
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

export default visitedReducer;