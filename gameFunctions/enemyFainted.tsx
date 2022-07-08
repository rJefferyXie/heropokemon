// Interfaces
import PokedexMap from '../interfaces/PokedexMap';
import PokemonMap from '../interfaces/PokemonMap';

const enemyFainted = (team: PokemonMap[], storage: PokemonMap[], pokedex: PokedexMap, enemy: PokemonMap) => {
  
  // make a deep copy of the team and storage to avoid mutating state
  const newTeam = JSON.parse(JSON.stringify(team));
  const newStorage = JSON.parse(JSON.stringify(storage));

  // need to create a list to make sure duplicate pokemon aren't added
  const capturedPokemon: string[] = [];
  newTeam.map((pokemon: PokemonMap) => {
    capturedPokemon.push(pokemon.name);
  });

  newStorage.map((pokemon: PokemonMap) => {
    capturedPokemon.push(pokemon.name);
  })

  // 10% chance for the defeated pokemon to join our newTeam
  const joinTeamChance = Math.floor(Math.random() * 100 + 1);
  if (joinTeamChance >= 90) {
    if (newTeam.length < 6) {
      if (!capturedPokemon.includes(enemy.name)) {
        newTeam.push(JSON.parse(JSON.stringify(enemy)));
        newTeam[newTeam.length - 1].stats[0] = newTeam[newTeam.length - 1].stats[1];
      }
    } else {
      if (!capturedPokemon.includes(enemy.name)) {
        newStorage.push(JSON.parse(JSON.stringify(enemy)));
        newStorage[newStorage.length - 1].stats[0] = newStorage[newStorage.length - 1].stats[1];
      }
    }
  } 

  // all pokemon that are lower level than the enemy have a chance to level up
  newTeam.map((_: PokemonMap, idx: number) => {
    const levelUpChance =  Math.floor(Math.random() * 100 + 1);
    if (newTeam[idx].level < enemy.level && levelUpChance > 80) {          
      newTeam[idx].level += 1;

      // level up raises pokemon stats by up to 2 points each
      for (let i = 0; i < 6; i++) {
        const statBoost = Math.floor(Math.random() * 2);
        if (i === 0 && newTeam[idx].stats[i] > 0) newTeam[idx].stats[i] += statBoost;
        newTeam[idx].statBoosts[i] += statBoost;
        newTeam[idx].stats[i + 1] += statBoost;
      }

      // pokemon evolutions are possible at level 18 and level 36
      if (newTeam[idx].evolutions.length > 0) {
        if (newTeam[idx].evolves_from === '' && newTeam[idx].level === 18
          || newTeam[idx].evolves_from !== '' && newTeam[idx].level === 36) {
          const evolutions = newTeam[idx].evolutions;
          const evolution = Math.floor(Math.random() * evolutions.length);   
          const evolvedPokemon = JSON.parse(JSON.stringify(pokedex[evolutions[evolution]]));    
          evolvedPokemon.level = newTeam[idx].level;
          evolvedPokemon.statBoosts = newTeam[idx].statBoosts;

          if (evolvedPokemon.stats[0] > 0) evolvedPokemon.stats[0] += evolvedPokemon.statBoosts[0];
          evolvedPokemon.stats[0] -= newTeam[idx].stats[1] - newTeam[idx].stats[0];
          
          for (let i = 0; i < 6; i++) {
            evolvedPokemon.stats[i + 1] += evolvedPokemon.statBoosts[i];
          }

          newTeam[idx] = evolvedPokemon;
        }
      }
    }
  });

  return { newTeam, newStorage };
}

export default enemyFainted;