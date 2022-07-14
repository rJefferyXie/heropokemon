import { SET_ITEMS } from '../types';

const setItems = (items: {}) => {
  return {
    type: SET_ITEMS,
    payload: items
  }
}

export default { setItems }