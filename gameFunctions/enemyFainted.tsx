// Interfaces
import PokedexMap from '../interfaces/PokedexMap';
import PokemonMap from '../interfaces/PokemonMap';

const enemyFainted = (team: PokedexMap, storage: PokedexMap, pokedex: PokedexMap, enemy: PokemonMap) => {
  
  // make a deep copy of the team and storage to avoid mutating state
  const newTeam = JSON.parse(JSON.stringify(team));
  const newStorage = JSON.parse(JSON.stringify(storage));

  // 3% chance for the defeated pokemon to join our newTeam
  const joinTeamChance = Math.floor(Math.random() * 100 + 1);
  if (joinTeamChance >= 98) {
    if (Object.keys(newTeam).length < 6) {
      if (!Object.keys(newTeam).includes(enemy.name)) {
        newTeam[enemy.name] = JSON.parse(JSON.stringify(enemy));
        newTeam[enemy.name].stats[0] = newTeam[enemy.name].stats[1];
      }
    } else {
      if (!Object.keys(storage).includes(enemy.name)) {
        newStorage[enemy.name] = JSON.parse(JSON.stringify(enemy));
        newStorage[enemy.name].stats[0] = newStorage[enemy.name].stats[1];
      }
    }
  } 

  // all pokemon that are lower level than the enemy have a chance to level up
  Object.keys(newTeam).map(pokemon => {
    const levelUpChance =  Math.floor(Math.random() * 100 + 1);
    if (newTeam[pokemon].level < enemy.level && levelUpChance > 80) {          
      newTeam[pokemon].level += 1;

      // level up raises pokemon stats by up to 2 points each
      for (let i = 0; i < 6; i++) {
        const statBoost = Math.floor(Math.random() * 2);
        if (i === 0) newTeam[pokemon].stats[i] += statBoost;
        newTeam[pokemon].statBoosts[i] += statBoost;
        newTeam[pokemon].stats[i + 1] += statBoost;
      }

      // pokemon evolutions are possible at level 18 and level 36
      if (newTeam[pokemon].evolutions.length > 0) {
        if (newTeam[pokemon].evolves_from === '' && newTeam[pokemon].level === 18
          || newTeam[pokemon].evolves_from !== '' && newTeam[pokemon].level === 36) {
          const evolutions = newTeam[pokemon].evolutions;
          const evolution = Math.floor(Math.random() * evolutions.length);   
          const evolvedPokemon = JSON.parse(JSON.stringify(pokedex[evolutions[evolution]]));    
          evolvedPokemon.level = newTeam[pokemon].level;
          evolvedPokemon.statBoosts = newTeam[pokemon].statBoosts;
          evolvedPokemon.stats[0] += evolvedPokemon.statBoosts[0];
          evolvedPokemon.stats[0] -= newTeam[pokemon].stats[1] - newTeam[pokemon].stats[0];
          
          for (let i = 0; i < 6; i++) {
            evolvedPokemon.stats[i + 1] += evolvedPokemon.statBoosts[i];
          }

          newTeam[pokemon] = evolvedPokemon;
        }
      }
    }
  });

  return { newTeam, newStorage };
}

export default enemyFainted;