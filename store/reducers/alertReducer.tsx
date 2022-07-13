// Types
import { PayloadAction } from '@reduxjs/toolkit';
import { ADD_ALERT, NEXT_ALERT } from '../types';

const initialState = {
  alerts: []
}

const alertReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case ADD_ALERT: {
      return {
        ...state,
        alerts: [...state.alerts, action.payload]
      }
    }

    case NEXT_ALERT: {
      return {
        ...state,
        alerts: state.alerts.slice(1)
      }
    }

    default: {
      return state;
    }
  }
}

export default alertReducer;