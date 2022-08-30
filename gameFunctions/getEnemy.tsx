// Interfaces
import PokedexMap from '../interfaces/PokedexMap';
import PokemonMap from '../interfaces/PokemonMap';

// Constants
import BiomeTypes from '../constants/BiomeTypes';

const evolvePokemon = (enemy: PokemonMap, pokedex: PokedexMap): PokemonMap => {
  if (enemy.evolutions.length > 0) {
    const evolution = Math.floor(Math.random() * enemy.evolutions.length);   
    enemy = JSON.parse(JSON.stringify(pokedex[enemy.evolutions[evolution]])); 
  }

  return enemy;
}

const getEnemy = (pokedex: PokedexMap, floor: number, biome: string): PokemonMap => {
  const pokemonList = Object.keys(pokedex);
  let enemyInfo: PokemonMap;

  // @ts-expect-error    
  while (enemyInfo === undefined) {
    const enemyName = pokemonList[Math.floor(Math.random() * pokemonList.length)]; 
    const pokemonEntry = pokedex[enemyName];

    if (biome !== "gym" && biome !== '' && biome !== undefined) {
      let flag = false;
      if (BiomeTypes[biome].includes(pokemonEntry.types[0]) || pokemonEntry.types[0] === "normal") {
        flag = true;
      }

      if (pokemonEntry.types[1]) {
        if (BiomeTypes[biome].includes(pokemonEntry.types[1]) || pokemonEntry.types[1] === "normal") {
          flag = true;
        }
      }

      if (!flag) continue;
    }

    // no mythical or legendary pokemon until after floor 40
    if (floor < 40 && (pokemonEntry.is_legendary || pokemonEntry.is_mythical)) continue;

    // only pokemon that have not evolved yet
    if (floor < 36 && pokemonEntry.evolves_from !== '') continue;

    // only pokemon that have less than 50 hp
    if (floor < 10 && pokemonEntry.stats[0] > 50) continue;

    // make a deep copy of the pokemon to avoid mutating state
    enemyInfo = JSON.parse(JSON.stringify(pokedex[enemyName]));

    // Use the floor as a guide for the pokemon's level, ( min: 2, max: none )
    const minLevel = Math.max(floor - 2, 2);
    const maxLevel = floor + 2;
    const level = Math.floor(Math.random() * (maxLevel - minLevel + 1) + minLevel);

    // all pokemon after and during floor 36 will be fully evolved
    if (level >= 36) {
      enemyInfo = evolvePokemon(enemyInfo, pokedex);
    } 

    // all pokemon after and during floor 18 will have evolved once if they are able
    if (level >= 18) {
      enemyInfo = evolvePokemon(enemyInfo, pokedex);
    }

    // adjust enemy stats according to level
    enemyInfo.level = level;
    for (let i = 0; i < 6; i++) {
      const statBoost = Math.floor(Math.random() * floor * 2);
      if (i === 0) enemyInfo.stats[i] += statBoost;

      enemyInfo.statBoosts[i] = statBoost;
      enemyInfo.stats[i + 1] += statBoost;
    }

    enemyInfo.stats[0] = 10 * (level - 1 + 1.55 ** (level - 1))

    if (floor % 10 === 0) {
      enemyInfo.stats[0] *= 10;
    }

    if (enemyInfo.is_legendary) {
      enemyInfo.stats[0] *= 25;
    }

    if (enemyInfo.is_mythical) {
      enemyInfo.stats[0] *= 20;
    }
  }

  return enemyInfo;
}

export default getEnemy;