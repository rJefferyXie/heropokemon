// Interfaces
import GameSave from '../interfaces/GameSave';

const getGameSave = () : GameSave | boolean => {
  const region = localStorage.getItem('selectedRegion');
  if (!region) return false;

  const gameData = localStorage.getItem(region + 'Save') || '{}';
  if (!gameData) return false;

  // get all game save related data
  const game = JSON.parse(gameData);
  return game;
}

export default getGameSave;