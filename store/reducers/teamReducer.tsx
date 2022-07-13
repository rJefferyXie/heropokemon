// Types
import { PayloadAction } from '@reduxjs/toolkit';
import { SET_TEAM } from '../types';

const initialState = {
  team: []
}

const teamReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case SET_TEAM: {
      return {
        ...state,
        team: action.payload
      }
    }

    default: {
      return state;
    }
  }
}

export default teamReducer;