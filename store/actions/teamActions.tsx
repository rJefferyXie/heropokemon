// Types
import { SET_TEAM } from '../types';

// Interfaces
import PokemonMap from '../../interfaces/PokemonMap';

const setTeam = (team: PokemonMap[]) => {
  return {
    type: SET_TEAM,
    payload: team
  }
}

export default { setTeam }