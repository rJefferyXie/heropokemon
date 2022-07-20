import { SET_BONUSES, SET_BONUS_POINTS, SET_EXPERIENCE, SET_LEVEL } from '../types';

const setBonuses = (bonuses: {}) => {
  return {
    type: SET_BONUSES,
    payload: bonuses
  }
}

const setBonusPoints = (points: number) => {
  return {
    type: SET_BONUS_POINTS,
    payload: points
  }
}

const setExperience = (experience: number) => {
  return {
    type: SET_EXPERIENCE,
    payload: experience
  }
}

const setLevel = (level: number) => {
  return {
    type: SET_LEVEL,
    payload: level
  }
}

export default { setBonuses, setBonusPoints, setExperience, setLevel }