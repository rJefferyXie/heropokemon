// Types
import { PayloadAction } from '@reduxjs/toolkit';
import { SET_LOADING } from '../types';

const initialState = {
  loading: true
}

const visitedReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }

    default: {
      return state;
    }
  }
}

export default visitedReducer;