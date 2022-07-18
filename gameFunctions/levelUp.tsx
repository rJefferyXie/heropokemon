// Interfaces
import PokedexMap from '../interfaces/PokedexMap';
import PokemonMap from '../interfaces/PokemonMap';

const levelUp = (team: PokemonMap[], idx: number, pokedex: PokedexMap) => {
  team[idx].level += 1;

  // level up raises pokemon stats by up to 2 points each
  for (let i = 0; i < 6; i++) {
    const statBoost = Math.floor(1 + Math.random() * 2);
    if (i === 0 && Math.floor(team[idx].stats[i]) > 0) team[idx].stats[i] += statBoost;
    team[idx].statBoosts[i] += statBoost;
    team[idx].stats[i + 1] += statBoost;
  }

  // evolutions are possible at level 18 and level 36
  const firstEvolutionExists = team[idx].evolves_from === '' && team[idx].level === 18;
  const secondEvolutionExists = team[idx].evolves_from !== '' && team[idx].level === 36;
  if (team[idx].evolutions.length > 0) {
    if (firstEvolutionExists || secondEvolutionExists) {
      const evolutions = team[idx].evolutions;
      const evolution = Math.floor(Math.random() * evolutions.length);   

      const evolvedPokemon = JSON.parse(JSON.stringify(pokedex[evolutions[evolution]]));    
      evolvedPokemon.level = team[idx].level;
      evolvedPokemon.statBoosts = team[idx].statBoosts;

      if (Math.floor(evolvedPokemon.stats[0]) > 0) evolvedPokemon.stats[0] += evolvedPokemon.statBoosts[0];
      evolvedPokemon.stats[0] -= team[idx].stats[1] - team[idx].stats[0];
      
      for (let i = 0; i < 6; i++) {
        evolvedPokemon.stats[i + 1] += evolvedPokemon.statBoosts[i];
      }

      team[idx] = evolvedPokemon;
    }
  }
}

export default levelUp;