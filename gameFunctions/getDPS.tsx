// Constants
import TypeAdvantages from '../constants/TypeAdvantages';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

const getDPS = (enemy: PokemonMap, pokemon: PokemonMap, vigor: {level: number}) => {
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

  // scale the damage down depending on level of pokemon
  if (pokemon.level < 20) {
    playerDPS /= (20 - pokemon.level);
  }

  if (!enemy.is_legendary && !enemy.is_mythical) {
    enemyDPS /= 25;
  }

  playerDPS *= (1 + (vigor.level * 0.1));
  if (Math.floor(pokemon.stats[0]) <= 0) playerDPS = 0;
  return { playerDPS, enemyDPS }
}

export default getDPS;