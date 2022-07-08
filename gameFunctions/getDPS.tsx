// Constants
import TypeAdvantages from '../constants/TypeAdvantages';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

// stats[2] = attack
// stats[3] = defense
// stats[4] = special attack
// stats[5] = special defense
// stats[6] = speed

const getDPS = (enemy: PokemonMap, pokemon: PokemonMap) => {
  let playerDPS = 0;
  let enemyDPS = 0;

  const playerHP = pokemon.stats[1] * 0.05;
  const enemyHP = enemy.stats[1] * 0.05;

  pokemon.stats[2] >= enemy.stats[3] ? playerDPS += enemyHP : playerDPS -= enemyHP;
  pokemon.stats[4] >= enemy.stats[5] ? playerDPS += enemyHP : playerDPS -= enemyHP;
  pokemon.stats[6] >= enemy.stats[6] ? playerDPS += enemyHP : playerDPS -= enemyHP;

  // calculate player multipliers from type advantages or disadvantages
  for (let i = 0; i < pokemon.types.length; i++) {
    const typeAdvantages = TypeAdvantages[pokemon.types[i]];
    for (let j = 0; j < enemy.types.length; j++) {
      if (typeAdvantages.strong.includes(enemy.types[j])) playerDPS += Math.abs(playerDPS) * 2;
      if (typeAdvantages.weak.includes(enemy.types[j])) playerDPS -= Math.abs(playerDPS) / 2;
      if (typeAdvantages.resist.includes(enemy.types[j])) playerDPS *= 0;          
    }
  }

  enemy.stats[2] >= pokemon.stats[3] ? enemyDPS += playerHP : enemyDPS -= playerHP;
  enemy.stats[4] >= pokemon.stats[5] ? enemyDPS += playerHP : enemyDPS -= playerHP;
  enemy.stats[6] >= pokemon.stats[6] ? enemyDPS += playerHP : enemyDPS -= playerHP;

  // calculate enemy multipliers from type advantages or disadvantages
  for (let i = 0; i < enemy.types.length; i++) {
    const typeAdvantages = TypeAdvantages[enemy.types[i]];
    for (let j = 0; j < pokemon.types.length; j++) {
      if (typeAdvantages.strong.includes(pokemon.types[j])) enemyDPS += Math.abs(enemyDPS) * 2;
      if (typeAdvantages.weak.includes(pokemon.types[j])) enemyDPS -= Math.abs(enemyDPS) / 2;
      if (typeAdvantages.resist.includes(pokemon.types[j])) enemyDPS *= 0;          
    }
  }

  // make sure that both sides are doing more than 0 damage per interval
  playerDPS = Math.max(playerDPS, enemyHP) / 5;
  enemyDPS = Math.max(enemyDPS, playerHP) / 20;

  return { playerDPS, enemyDPS }
}

export default getDPS;