const getGameSave = (region: string) => {
  const gameData = localStorage.getItem(region + 'Save');
  if (!gameData) return false;

  // get all game save related data
  const game = JSON.parse(gameData);
  return game;
}

export default getGameSave;