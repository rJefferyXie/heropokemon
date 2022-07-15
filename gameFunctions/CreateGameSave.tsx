// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

const CreateGameSave = (starter: PokemonMap) => {
  const starterLevel = 5;
  const starterInfo = JSON.parse(JSON.stringify(starter));
  starterInfo.level = starterLevel;

  // adjust pokemon stats according to pokemon level
  for (let i = 0; i < 6; i++) {
    const statBoost = Math.floor(Math.random() * starterLevel * 2);
    starterInfo.statBoosts[i] = statBoost;
    starterInfo.stats[i + 1] += statBoost;
  }

  starterInfo.stats[0] += starterInfo.statBoosts[0];

  return {
    "floor": 1,
    "currency": 0,
    "team": [starterInfo],
    "storage": [],
    "items": {
      "potion1": {
        "name": "Potion",
        "image": "images/potion1.webp",
        "quantity": 10,
        "description": "Heal a pokemon by 20 hitpoints."
      }
    },
    "badges": []
  }
}

export default CreateGameSave;