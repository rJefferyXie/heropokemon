// Interfaces
import ShopItem from '../interfaces/ShopItem';
import PokemonMap from '../interfaces/PokemonMap';
import PokedexMap from '../interfaces/PokedexMap';

// Game Functions
import LevelUp from '../gameFunctions/levelUp';

const useItem = (item: ShopItem, items: string[], team: PokemonMap[], pokemonIdx: number, pokedex: PokedexMap) => {
  const newTeam = JSON.parse(JSON.stringify(team));
  const newItems = JSON.parse(JSON.stringify(items));

  if (item.name === "Potion") {
    if (team[pokemonIdx].stats[0] >= team[pokemonIdx].stats[1]) return { newItems, newTeam }

    if (newTeam[pokemonIdx].stats[0] + 20 >= newTeam[pokemonIdx].stats[1]) {
      newTeam[pokemonIdx].stats[0] = newTeam[pokemonIdx].stats[1];
    } else {
      newTeam[pokemonIdx].stats[0] += 20;
    }
  }

  if (item.name === "Super Potion") {
    if (team[pokemonIdx].stats[0] >= team[pokemonIdx].stats[1]) return { newItems, newTeam }

    if (newTeam[pokemonIdx].stats[0] + 50 >= newTeam[pokemonIdx].stats[1]) {
      newTeam[pokemonIdx].stats[0] = newTeam[pokemonIdx].stats[1];
    } else {
      newTeam[pokemonIdx].stats[0] += 50;
    }
  }

  if (item.name === "Hyper Potion") {
    if (team[pokemonIdx].stats[0] >= team[pokemonIdx].stats[1]) return { newItems, newTeam }

    if (newTeam[pokemonIdx].stats[0] + 120 >= newTeam[pokemonIdx].stats[1]) {
      newTeam[pokemonIdx].stats[0] = newTeam[pokemonIdx].stats[1];
    } else {
      newTeam[pokemonIdx].stats[0] += 120;
    }
  }

  if (item.name === "Max Potion") {
    if (team[pokemonIdx].stats[0] >= team[pokemonIdx].stats[1]) return { newItems, newTeam }

    newTeam[pokemonIdx].stats[0] = newTeam[pokemonIdx].stats[1];
  }

  if (item.name === "Rare Candy") {
    if (team[pokemonIdx].level === 100) return { newItems, newTeam }
    LevelUp(newTeam, pokemonIdx, pokedex);
  }

  if (item.name === "HP Up") {
    if (newTeam[pokemonIdx].stats[0] > 0) newTeam[pokemonIdx].stats[0] += 1;

    newTeam[pokemonIdx].stats[1] += 1;
  }

  if (item.name === "Protein") {
    newTeam[pokemonIdx].stats[2] += 1;
  }

  if (item.name === "Iron") {
    newTeam[pokemonIdx].stats[3] += 1;
  }

  if (item.name === "Calcium") {
    newTeam[pokemonIdx].stats[4] += 1;
  }

  if (item.name === "Zinc") {
    newTeam[pokemonIdx].stats[5] += 1;
  }

  if (item.name === "Carbos") {
    newTeam[pokemonIdx].stats[6] += 1;
  }

  return { newItems, newTeam }
}

export default useItem;