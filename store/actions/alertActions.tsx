// Types
import { ADD_ALERT, NEXT_ALERT } from '../types';

const addAlert = (alert: string) => {
  return {
    type: ADD_ALERT,
    payload: alert
  }
}

const nextAlert = () => {
  return {
    type: NEXT_ALERT
  }
}

export default { addAlert, nextAlert }