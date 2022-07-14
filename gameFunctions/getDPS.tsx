// Constants
import TypeAdvantages from '../constants/TypeAdvantages';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

const getDPS = (enemy: PokemonMap, pokemon: PokemonMap) => {
  /* 
    Damage calculation taken from official pokemon games from Gen IV and onwards.
    link: https://bulbapedia.bulbagarden.net/wiki/Damage
    stats[2] = attack
    stats[3] = defense
    stats[4] = special attack
    stats[5] = special defense
    stats[6] = speed
  */
  let playerDPS = (((((2 * pokemon.level) / 5) + 2) * pokemon.level * ((pokemon.stats[2] + pokemon.stats[4]) / (enemy.stats[3] + enemy.stats[5]))) / 50) + pokemon.stats[6] * 0.05;
  let enemyDPS = (((((2 * enemy.level) / 5) + 2) * enemy.level * ((enemy.stats[2] + enemy.stats[4]) / (pokemon.stats[3] + pokemon.stats[5]))) / 50) + enemy.stats[6] * 0.05;

  // calculate player multipliers from type advantages or disadvantages
  for (let i = 0; i < pokemon.types.length; i++) {
    const typeAdvantages = TypeAdvantages[pokemon.types[i]];
    for (let j = 0; j < enemy.types.length; j++) {
      if (typeAdvantages.strong.includes(enemy.types[j])) playerDPS *= 2;
      if (typeAdvantages.weak.includes(enemy.types[j])) playerDPS *= 0.5;
      if (typeAdvantages.resist.includes(enemy.types[j])) playerDPS *= 0;          
    }
  }

  // calculate enemy multipliers from type advantages or disadvantages
  for (let i = 0; i < enemy.types.length; i++) {
    const typeAdvantages = TypeAdvantages[enemy.types[i]];
    for (let j = 0; j < pokemon.types.length; j++) {
      if (typeAdvantages.strong.includes(pokemon.types[j])) enemyDPS *= 2;
      if (typeAdvantages.weak.includes(pokemon.types[j])) enemyDPS *= 0.5;
      if (typeAdvantages.resist.includes(pokemon.types[j])) enemyDPS *= 0;          
    }
  }

  // make sure that both sides are doing more than 0 damage per interval
  playerDPS /= 5;
  enemyDPS /= 50;

  return { playerDPS, enemyDPS }
}

export default getDPS;