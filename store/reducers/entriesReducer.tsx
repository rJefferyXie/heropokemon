// Types
import { PayloadAction } from '@reduxjs/toolkit';
import { ADD_ENTRY } from '../types';

const initialState = {
  entries: [
    "bulbasaur", "charmander", "squirtle",
    "chikorita", "cyndaquil", "totodile",
    "treecko", "torchic", "mudkip",
    "turtwig", "chimchar", "piplup",
    "snivy", "tepig", "oshawott",
    "chespin", "fennekin", "froakie",
    "rowlet", "litten", "popplio"
  ]
}

const entriesReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case ADD_ENTRY: {
      return {
        ...state,
        entries: [...state.entries, action.payload]
      }
    }

    default: {
      return state;
    }
  }
}

export default entriesReducer;