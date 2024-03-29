import { combineReducers } from '@reduxjs/toolkit';

import tutorialReducer from './tutorialReducer';
import settingReducer from './settingReducer';
import pokedexReducer from './pokedexReducer';
import loadingReducer from './loadingReducer';
import regionsReducer from './regionsReducer';
import storageReducer from './storageReducer';
import damageReducer from './damageReducer';
import enemyReducer from './enemyReducer';
import alertReducer from './alertReducer';
import bonusReducer from './bonusReducer';
import biomeReducer from './biomeReducer';
import gameReducer from './gameReducer';
import teamReducer from './teamReducer';
import itemReducer from './itemReducer';

const rootReducer = combineReducers({
    tutorialReducer,
    settingReducer, 
    pokedexReducer, 
    loadingReducer,
    regionsReducer,
    storageReducer,
    damageReducer,
    enemyReducer,
    alertReducer,
    bonusReducer,
    biomeReducer,
    gameReducer,
    teamReducer,
    itemReducer
});

export default rootReducer;