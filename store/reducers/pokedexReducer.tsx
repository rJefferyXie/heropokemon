// Types
import { PayloadAction } from '@reduxjs/toolkit';
import { SET_POKEDEX, ADD_ENTRY } from '../types';

const initialState = {
  pokedex: {},
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

const pokedexReducer = (state = initialState, action: PayloadAction) => {
  switch (action.type) {
    case SET_POKEDEX: {
      return {
        ...state,
        pokedex: action.payload
      }
    }

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

export default pokedexReducer;