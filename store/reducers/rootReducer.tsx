import { combineReducers } from '@reduxjs/toolkit';

import settingReducer from './settingReducer';
import pokedexReducer from './pokedexReducer';
import loadingReducer from './loadingReducer';
import regionsReducer from './regionsReducer';
import gameReducer from './gameReducer';
import enemyReducer from './enemyReducer';

const rootReducer = combineReducers({
    settingReducer, 
    pokedexReducer, 
    loadingReducer,
    regionsReducer,
    gameReducer,
    enemyReducer
});

export default rootReducer;