// Interfaces
import PokedexMap from '../interfaces/PokedexMap';
import PokemonMap from '../interfaces/PokemonMap';

const getEnemy = (pokedex: PokedexMap, floor: number) => {
  const pokemonList = Object.keys(pokedex);
  let enemyInfo: PokemonMap;

  // @ts-expect-error    
  while (enemyInfo === undefined) {
    const enemyName = pokemonList[Math.floor(Math.random() * pokemonList.length)]; 
    const pokemonEntry = pokedex[enemyName];

    // no mythical or legendary pokemon until after floor 40
    if (floor < 40) {
      if (pokemonEntry.is_legendary || pokemonEntry.is_mythical) {
        continue;
      }
    }

    // only pokemon that have not evolved yet
    if (floor < 36) {
      if (pokemonEntry.evolves_from !== '') {
        continue;
      }
    }

    // only pokemon that have less than 50 hp
    if (floor < 10) {
      if (pokemonEntry.stats[0] > 50) {
        continue;
      }
    }

    // make a deep copy of the pokemon to avoid mutating state
    enemyInfo = JSON.parse(JSON.stringify(pokedex[enemyName]));

    // Use the floor as a guide for the pokemon's level, ( min: 2, max: 100 )
    const minLevel = floor - 2;
    const maxLevel = floor + 2;
    const level = Math.floor(Math.random() * (maxLevel - minLevel + 1) + minLevel);

    // all pokemon after and during floor 36 will be fully evolved
    if (level >= 36) {

      // get next evolution if it exists
      if (enemyInfo.evolutions.length > 0) {
        const evolution = Math.floor(Math.random() * enemyInfo.evolutions.length);   
        enemyInfo = JSON.parse(JSON.stringify(pokedex[enemyInfo.evolutions[evolution]])); 
      }
    } 

    // all pokemon after and during floor 18 will have evolved once if they are able
    if (level >= 18) {

      // get next evolution if it exists
      if (enemyInfo.evolutions.length > 0) {
        const evolution = Math.floor(Math.random() * enemyInfo.evolutions.length);   
        enemyInfo = JSON.parse(JSON.stringify(pokedex[enemyInfo.evolutions[evolution]])); 
      }
    }

    enemyInfo.level = Math.max(Math.min(level, 100), 2);

    // adjust enemy stats according to level
    for (let i = 0; i < 6; i++) {
      const statBoost = Math.floor(Math.random() * floor * 2);
      if (i === 0) enemyInfo.stats[i] += statBoost;

      enemyInfo.statBoosts[i] = statBoost;
      enemyInfo.stats[i + 1] += statBoost;
    }

    enemyInfo.stats[0] *= enemyInfo.level;
    enemyInfo.stats[1] *= enemyInfo.level;
  }

  return enemyInfo;
}

export default getEnemy;