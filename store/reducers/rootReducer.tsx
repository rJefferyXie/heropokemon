import { combineReducers } from '@reduxjs/toolkit';

import settingReducer from './settingReducer';
import pokedexReducer from './pokedexReducer';
import loadingReducer from './loadingReducer';
import regionsReducer from './regionsReducer';
import damageReducer from './damageReducer';
import enemyReducer from './enemyReducer';
import alertReducer from './alertReducer';
import gameReducer from './gameReducer';
import teamReducer from './teamReducer';
import itemReducer from './itemReducer';

const rootReducer = combineReducers({
    settingReducer, 
    pokedexReducer, 
    loadingReducer,
    regionsReducer,
    damageReducer,
    enemyReducer,
    alertReducer,
    gameReducer,
    teamReducer,
    itemReducer
});

export default rootReducer;