// Interfaces
import PokedexMap from '../interfaces/PokedexMap';
import PokemonMap from '../interfaces/PokemonMap';

const addPokemon = (destination: PokemonMap[], enemy: PokemonMap) => {
  destination.push(JSON.parse(JSON.stringify(enemy)));
  destination[destination.length - 1].stats[0] = destination[destination.length - 1].stats[1];
}

const containsDuplicate = (team: PokemonMap[], storage: PokemonMap[], enemy: PokemonMap) => {
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

  return containsDuplicate;
}

const enemyFainted = (team: PokemonMap[], storage: PokemonMap[], pokedex: PokedexMap, enemy: PokemonMap, kindSoul: {level: number}) => {  
  const newTeam = JSON.parse(JSON.stringify(team));
  const newStorage = JSON.parse(JSON.stringify(storage));
  let joinMessage;

  // 10% chance for the defeated pokemon to join our newTeam
  const joinTeamChance = Math.floor(Math.random() * 100 + 1);
  if (joinTeamChance >= (90 * (1 - kindSoul.level * 0.1))) {
    if (!containsDuplicate(team, storage, enemy)) {
      newTeam.length < 6 ? addPokemon(newTeam, enemy) : addPokemon(newStorage, enemy);
      joinMessage = enemy.name.toUpperCase() + " has joined your party!";
    }
  } 

  return { newTeam, newStorage, joinMessage }
}

export default enemyFainted;