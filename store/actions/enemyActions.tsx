// Types
import { SET_ENEMY, HIT_ENEMY, SET_ENEMIES_LEFT } from '../types';

// Interfaces
import PokemonMap from '../../interfaces/PokemonMap';

const setEnemy = (enemy: PokemonMap) => {
  return {
    type: SET_ENEMY,
    payload: enemy
  }
}

const hitEnemy = (damage: number) => {
  return {
    type: HIT_ENEMY,
    payload: damage
  }
}

const setEnemiesLeft = (enemies: number) => {
  return {
    type: SET_ENEMIES_LEFT,
    payload: enemies
  }
}

export default { setEnemy, hitEnemy, setEnemiesLeft }