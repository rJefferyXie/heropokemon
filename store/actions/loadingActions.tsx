// Types
import { SET_LOADING } from '../types';

const setLoading = (loading: boolean) => {
  return {
    type: SET_LOADING,
    payload: loading
  }
}

export default { setLoading }