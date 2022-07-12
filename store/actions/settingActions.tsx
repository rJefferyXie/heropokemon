// Types
import { CHANGE_ARTWORK, SET_VISITED } from '../types';

const changeArtwork = (artwork: string) => {
  return {
    type: CHANGE_ARTWORK,
    payload: artwork
  }
}

const setVisited = () => {
  return {
    type: SET_VISITED
  }
}

export default { changeArtwork, setVisited }