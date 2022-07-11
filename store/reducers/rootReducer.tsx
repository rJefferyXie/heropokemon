import { combineReducers } from '@reduxjs/toolkit';

import artworkReducer from './artworkReducer';
import pokedexReducer from './pokedexReducer';
import visitedReducer from './visitedReducer';
import loadingReducer from './loadingReducer';
import regionsReducer from './regionsReducer';

const rootReducer = combineReducers({
    artworkReducer, 
    pokedexReducer, 
    visitedReducer, 
    loadingReducer,
    regionsReducer
});

export default rootReducer;