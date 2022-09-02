// Types
import { PayloadAction } from '@reduxjs/toolkit';
import {
  SET_SHOW_TUTORIAL,
  SET_TUTORIAL_PAGE
} from '../types';

const initialState = {
  showTutorial: true,
  tutorialPage: 0
}

const tutorialReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case SET_SHOW_TUTORIAL: {
      return {
        ...state,
        showTutorial: !state.showTutorial
      }
    }

    case SET_TUTORIAL_PAGE: {
      return {
        ...state,
        tutorialPage: action.payload
      }
    }

    default: {
      return state;
    }
  }
}

export default tutorialReducer;