import { SET_BONUSES, ADD_BONUS_POINTS } from '../types';

const setBonuses = (bonuses: {}) => {
  return {
    type: SET_BONUSES,
    payload: bonuses
  }
}

const addBonusPoints = (points: number) => {
  return {
    type: ADD_BONUS_POINTS,
    payload: points
  }
}

export default { setBonuses, addBonusPoints }