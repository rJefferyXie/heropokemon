// Constants
import TypeAdvantages from '../constants/TypeAdvantages';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

const getDPS = (enemy: PokemonMap, pokemon: PokemonMap) => {
  /* 
    Damage calculation taken from official pokemon games from Gen IV.
    link: https://bulbapedia.bulbagarden.net/wiki/Damage

    StatMap: 
      stats[2] = attack
      stats[3] = defense
      stats[4] = special attack
      stats[5] = special defense
      stats[6] = speed
  */
  let playerDPS = (((((2 * pokemon.level) / 5) + 2) * pokemon.level * ((pokemon.stats[2] + pokemon.stats[4]) / (enemy.stats[3] + enemy.stats[5]))) / 50) + pokemon.stats[6] * 0.05;
  let enemyDPS = (((((2 * enemy.level) / 5) + 2) * enemy.level * ((enemy.stats[2] + enemy.stats[4]) / (pokemon.stats[3] + pokemon.stats[5]))) / 50) + enemy.stats[6] * 0.05;

  for (let i = 0; i < pokemon.types.length; i++) {
    const playerTypeAdvantages = TypeAdvantages[pokemon.types[i]];
    for (let j = 0; j < enemy.types.length; j++) {
      const enemyTypeAdvantages = TypeAdvantages[enemy.types[j]];

      // calculate enemy multipliers from type advantages or disadvantages
      if (enemyTypeAdvantages.strong.includes(pokemon.types[i])) enemyDPS *= 2;
      if (enemyTypeAdvantages.weak.includes(pokemon.types[i])) enemyDPS *= 0.5;
      if (enemyTypeAdvantages.resist.includes(pokemon.types[i])) enemyDPS *= 0;  

      // calculate player multipliers from type advantages or disadvantages
      if (playerTypeAdvantages.strong.includes(enemy.types[j])) playerDPS *= 2;
      if (playerTypeAdvantages.weak.includes(enemy.types[j])) playerDPS *= 0.5;
      if (playerTypeAdvantages.resist.includes(enemy.types[j])) playerDPS *= 0;          
    }
  }

  // make sure that both sides are doing more than 0 damage per interval
  playerDPS = Math.max(playerDPS, 1) / 10;
  enemyDPS = Math.max(enemyDPS, 1) / 100;

  return { playerDPS, enemyDPS }
}

export default getDPS;