const getGameSave = (region: string) => {
  const gameData = localStorage.getItem(region + 'Save');
  if (!gameData) return false;
  
  return JSON.parse(gameData);
}

export default getGameSave;