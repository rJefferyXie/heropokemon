import { combineReducers } from '@reduxjs/toolkit';

import settingReducer from './settingReducer';
import pokedexReducer from './pokedexReducer';
import loadingReducer from './loadingReducer';
import regionsReducer from './regionsReducer';

const rootReducer = combineReducers({
    settingReducer, 
    pokedexReducer, 
    loadingReducer,
    regionsReducer
});

export default rootReducer;