import { SET_CLICK_DAMAGE, SET_PLAYER_DPS } from '../types';

const setClickDamage = (damage: number) => {
  return {
    type: SET_CLICK_DAMAGE,
    payload: damage
  }
}

const setPlayerDPS = (dps: number) => {
  return {
    type: SET_PLAYER_DPS,
    payload: dps
  }
}

export default { setClickDamage, setPlayerDPS }