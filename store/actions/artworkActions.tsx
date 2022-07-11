import { CHANGE_ARTWORK } from '../types';

const changeArtwork = (artwork: string) => {
  return {
    type: CHANGE_ARTWORK,
    payload: artwork
  }
}

export default { changeArtwork }