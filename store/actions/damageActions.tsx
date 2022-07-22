import { SET_PLAYER_DPS } from '../types';

const setPlayerDPS = (dps: number) => {
  return {
    type: SET_PLAYER_DPS,
    payload: dps
  }
}

export default { setPlayerDPS }