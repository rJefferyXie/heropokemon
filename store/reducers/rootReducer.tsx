import { combineReducers } from '@reduxjs/toolkit';

import artworkReducer from './artworkReducer';
import pokedexReducer from './pokedexReducer';
import visitedReducer from './visitedReducer';
import loadingReducer from './loadingReducer';
import regionsReducer from './regionsReducer';
import entriesReducer from './entriesReducer';

const rootReducer = combineReducers({
    artworkReducer, 
    pokedexReducer, 
    visitedReducer, 
    loadingReducer,
    regionsReducer,
    entriesReducer
});

export default rootReducer;