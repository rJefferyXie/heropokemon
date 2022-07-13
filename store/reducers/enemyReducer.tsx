// Types
import { PayloadAction } from '@reduxjs/toolkit';
import { SET_ENEMY, HIT_ENEMY, SET_ENEMIES_LEFT } from '../types';

// Interfaces
import PokemonMap from '../../interfaces/PokemonMap';

const initialState = {
  enemy: {} as PokemonMap,
  enemiesLeft: 10
}

const enemyReducer = (state = initialState, action: PayloadAction<any>) => {
  switch (action.type) {
    case SET_ENEMY: {
      return {
        ...state,
        enemy: action.payload
      }
    }

    case HIT_ENEMY: {
      return {
        ...state,
        enemy: {
          ...state.enemy,
          stats: state.enemy.stats.map((stat, idx) => {
            if (idx === 0) stat -= action.payload;
            return stat;
          })
        }        
      }
    }

    case SET_ENEMIES_LEFT: {
      return {
        ...state,
        enemiesLeft: action.payload
      }
    }

    default: {
      return state;
    }
  }
}

export default enemyReducer;