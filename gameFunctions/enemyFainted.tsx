// Interfaces
import PokedexMap from '../interfaces/PokedexMap';
import PokemonMap from '../interfaces/PokemonMap';

// Game Functions
import LevelUp from './levelUp';

const addPokemon = (destination: PokemonMap[], enemy: PokemonMap) => {
  destination.push(JSON.parse(JSON.stringify(enemy)));
  destination[destination.length - 1].stats[1] /= destination[destination.length - 1].level;
  destination[destination.length - 1].stats[0] = destination[destination.length - 1].stats[1];
}

const enemyFainted = (team: PokemonMap[], storage: PokemonMap[], pokedex: PokedexMap, enemy: PokemonMap, kindSoul: {level: number}) => {  
  const newTeam = JSON.parse(JSON.stringify(team));
  const newStorage = JSON.parse(JSON.stringify(storage));
  let joinMessage;

  // 25% chance for the defeated pokemon to join our newTeam
  const joinTeamChance = Math.floor(Math.random() * 100 + 1);
  if (joinTeamChance >= (75 * (1 - kindSoul.level * 0.1))) {
    const pokemonOwned: string[] = [];
    let containsDuplicate = false;

    team.map((pokemon) => {
      pokemonOwned.push(pokemon.name);
    });
  
    storage.map((pokemon) => {
      pokemonOwned.push(pokemon.name);
    });

    if (pokemonOwned.includes(enemy.name)) {
      containsDuplicate = true;
    }

    if (pokemonOwned.includes(enemy.evolves_from)) {
      containsDuplicate = true;
    }

    enemy.evolutions.map((name) => {
      if (pokemonOwned.includes(name)) {
        containsDuplicate = true;
      }
    });

    if (!containsDuplicate) {
      newTeam.length < 6 ? addPokemon(newTeam, enemy) : addPokemon(newStorage, enemy);
      joinMessage = enemy.name.toUpperCase() + " has joined your party!";
    }
  } 

  // all pokemon that are lower level than the enemy have a chance to level up
  newTeam.map((_: PokemonMap, idx: number) => {
    const levelUpChance =  Math.floor(Math.random() * 100 + 1);
    if (newTeam[idx].level === 100) return;

    if (newTeam[idx].level < enemy.level - 3) {
      LevelUp(newTeam, idx, pokedex);

    } else if (newTeam[idx].level < enemy.level - 2 && levelUpChance >= 25) {
      LevelUp(newTeam, idx, pokedex);

    } else if (newTeam[idx].level < enemy.level - 1 && levelUpChance >= 50) {
      LevelUp(newTeam, idx, pokedex);

    } else if (newTeam[idx].level === enemy.level && levelUpChance >= 75) {
      LevelUp(newTeam, idx, pokedex);

    }
  });

  return { newTeam, newStorage, joinMessage }
}

export default enemyFainted;