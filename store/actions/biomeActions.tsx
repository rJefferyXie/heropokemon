import {
  SET_BIOMES,
  SET_ACTIVE_BIOME
} from '../types';

const setBiomes = (biomes: string[]) => {
  return {
    type: SET_BIOMES,
    payload: biomes
  }
}

const setActiveBiome = (biome: string) => {
  return {
    type: SET_ACTIVE_BIOME,
    payload: biome
  }
}

export default {
  setBiomes,
  setActiveBiome
}