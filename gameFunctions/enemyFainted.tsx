// Interfaces
import PokedexMap from '../interfaces/PokedexMap';
import PokemonMap from '../interfaces/PokemonMap';

const addPokemon = (destination: PokemonMap[], enemy: PokemonMap) => {
  destination.push(JSON.parse(JSON.stringify(enemy)));
  destination[destination.length - 1].stats[1] /= destination[destination.length - 1].level;
  destination[destination.length - 1].stats[0] = destination[destination.length - 1].stats[1];
}

const levelUp = (pokemon: PokemonMap, pokedex: PokedexMap) => {
  pokemon.level += 1;

  // level up raises pokemon stats by up to 2 points each
  for (let i = 0; i < 6; i++) {
    const statBoost = Math.floor(Math.random() * 2);
    if (i === 0 && Math.floor(pokemon.stats[i]) > 0) pokemon.stats[i] += statBoost;
    pokemon.statBoosts[i] += statBoost;
    pokemon.stats[i + 1] += statBoost;
  }

  // pokemon evolutions are possible at level 18 and level 36
  const firstEvolutionExists = pokemon.evolves_from === '' && pokemon.level === 18;
  const secondEvolutionExists = pokemon.evolves_from !== '' && pokemon.level === 36;
  if (pokemon.evolutions.length > 0) {
    if (firstEvolutionExists || secondEvolutionExists) {
      const evolutions = pokemon.evolutions;
      const evolution = Math.floor(Math.random() * evolutions.length);   

      const evolvedPokemon = JSON.parse(JSON.stringify(pokedex[evolutions[evolution]]));    
      evolvedPokemon.level = pokemon.level;
      evolvedPokemon.statBoosts = pokemon.statBoosts;

      if (Math.floor(evolvedPokemon.stats[0]) > 0) evolvedPokemon.stats[0] += evolvedPokemon.statBoosts[0];
      evolvedPokemon.stats[0] -= pokemon.stats[1] - pokemon.stats[0];
      
      for (let i = 0; i < 6; i++) {
        evolvedPokemon.stats[i + 1] += evolvedPokemon.statBoosts[i];
      }

      pokemon = evolvedPokemon;
    }
  }
}

const enemyFainted = (team: PokemonMap[], storage: PokemonMap[], pokedex: PokedexMap, enemy: PokemonMap) => {  
  const newTeam = JSON.parse(JSON.stringify(team));
  const newStorage = JSON.parse(JSON.stringify(storage));

  // 25% chance for the defeated pokemon to join our newTeam
  const joinTeamChance = Math.floor(Math.random() * 100 + 1);
  if (joinTeamChance >= 75) {
    newTeam.length < 6 ? addPokemon(newTeam, enemy) : addPokemon(newStorage, enemy);
  } 

  // all pokemon that are lower level than the enemy have a chance to level up
  newTeam.map((_: PokemonMap, idx: number) => {
    const levelUpChance =  Math.floor(Math.random() * 100 + 1);

    if (newTeam[idx].level < enemy.level - 3) {
      levelUp(newTeam[idx], pokedex);

    } else if (newTeam[idx].level < enemy.level - 2 && levelUpChance >= 25) {
      levelUp(newTeam[idx], pokedex);

    } else if (newTeam[idx].level < enemy.level - 1 && levelUpChance >= 50) {
      levelUp(newTeam[idx], pokedex);

    } else if (newTeam[idx].level === enemy.level && levelUpChance >= 75) {
      levelUp(newTeam[idx], pokedex);

    }
  });

  return { newTeam, newStorage }
}

export default enemyFainted;