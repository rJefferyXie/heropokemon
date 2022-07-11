// Types
import { ADD_REGION } from '../types';

const addRegion = (region: string) => {
  return {
    type: ADD_REGION,
    payload: region
  }
}

export default { addRegion }