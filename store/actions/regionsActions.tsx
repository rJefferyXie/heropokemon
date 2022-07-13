// Types
import { UNLOCK_REGION, SET_REGION } from '../types';

const unlockRegion = (region: string) => {
  return {
    type: UNLOCK_REGION,
    payload: region
  }
}

const setRegion = (region: string) => {
  return {
    type: SET_REGION,
    payload: region
  }
}

export default { unlockRegion, setRegion }