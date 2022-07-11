import { CHANGE_ARTWORK } from '../types';

const initialState = {
  artwork: "official"
}

const artworkReducer = (state = initialState, action: any) => {
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