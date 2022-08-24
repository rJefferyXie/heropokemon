// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

const healPokemon = (team: PokemonMap[], items: any, index: number) => {
  const newTeam = JSON.parse(JSON.stringify(team));
  const newItems = JSON.parse(JSON.stringify(items));

  const potion1 = items["potion1"] && items["potion1"].quantity > 0;
  const potion2 = items["potion2"] && items["potion2"].quantity > 0;
  const potion3 = items["potion3"] && items["potion3"].quantity > 0;
  const potion4 = items["potion4"] && items["potion4"].quantity > 0;

  if (!(potion1 || potion2 || potion3 || potion4)) {
    return { newTeam, newItems }
  }

  let potionUsed = false;
  if (potion1) {
    if (team[index].stats[0] + 20 >= team[index].stats[1]) {
      newTeam[index].stats[0] = newTeam[index].stats[1];
      newItems["potion1"].quantity -= 1;
      potionUsed = true;
    } else if (!(potion2 || potion3 || potion4)) {
      newTeam[index].stats[0] += 20;
      newItems["potion1"].quantity -= 1;
      potionUsed = true;
    }
  }

  if (potion2 && !potionUsed) {
    if (team[index].stats[0] + 50 >= team[index].stats[1]) {
      newTeam[index].stats[0] = newTeam[index].stats[1];
      newItems["potion2"].quantity -= 1;
      potionUsed = true;
    } else if (!(potion3 || potion4)) {
      newTeam[index].stats[0] += 50;
      newItems["potion2"].quantity -= 1;
      potionUsed = true;
    }      
  }

  if (potion3 && !potionUsed) {
    if (team[index].stats[0] + 120 >= team[index].stats[1]) {
      newTeam[index].stats[0] = newTeam[index].stats[1];
      newItems["potion3"].quantity -= 1;
      potionUsed = true;
    } else if (!potion4) {
      newTeam[index].stats[0] += 120;
      newItems["potion3"].quantity -= 1;
      potionUsed = true;
    }  
  }

  if (potion4 && !potionUsed) {
    newTeam[index].stats[0] = newTeam[index].stats[1];
    newItems["potion4"].quantity -= 1;
    potionUsed = true;
  }

  return { newTeam, newItems }
}

export default healPokemon;