// Types
import { PayloadAction } from '@reduxjs/toolkit';
import { SET_ITEMS } from '../types';

const initialState = {
  items: {}
}

const itemReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case SET_ITEMS: {
      return {
        ...state,
        items: action.payload
      }
    }
    
    default: {
      return state;
    }
  }
}

export default itemReducer;