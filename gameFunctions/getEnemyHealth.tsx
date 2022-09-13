// Interfaces
import PokemonMap from "../interfaces/PokemonMap"

const getEnemyHealth = (enemy: PokemonMap, currentFloor: number) => {
  let enemyHP = 10 * (enemy.level - 1 + Math.pow(1.3, (enemy.level - 1)));
  if (currentFloor % 10 === 0) enemyHP *= 2;
  if (enemy.is_mythical) enemyHP *= 5;
  if (enemy.is_legendary) enemyHP *= 7;

  return enemyHP;
}

export default getEnemyHealth;