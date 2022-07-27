// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

// Constants
import biomeList from '../constants/BiomeList';

const createGameSave = (starter: PokemonMap) => {
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

  const firstBiome = Object.keys(biomeList)[Math.floor(Math.random() * (Object.keys(biomeList).length - 1))];

  return {
    "floor": 1,
    "highestFloor": 1,
    "currency": 0,
    "gameBeaten": false,
    "team": [starterInfo],
    "biomes": [firstBiome],
    "storage": [],
    "items": {
      "potion1": {
        "name": "Potion",
        "id": "potion1",
        "image": "/images/items/potion1.webp",
        "quantity": 10,
        "description": "Heal a pokemon by 20 hitpoints."
      }
    },
    "badges": [],
    "experience": 0,
    "level": 1,
    "bonusPoints": 0,
    "bonuses": {
      "regeneration": {
        level: 0
      },
      "kindSoul": {
        level: 0
      },
      "vigor": {
        level: 0
      },
      "strongStyle": {
        level: 0
      },
      "fortune": {
        level: 0
      },
      "mysteryBall": {
        level: -1
      },
      "swapper": {
        level: -1,
        unlocked: false,
        activated: false
      },
      "healer": {
        level: -1,
        unlocked: false,
        activated: false
      }
    }
  }
}

export default createGameSave;