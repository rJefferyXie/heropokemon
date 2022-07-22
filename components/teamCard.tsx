// React and Styling
import React from 'react';
import styles from '../styles/TeamCard.module.scss';

// Animations
import { motion } from 'framer-motion';
import PokemonJoin from '../animations/pokemonJoin';

// MUI
import { Button } from '@mui/material';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

interface PokemonCardProps {
  index: number,
  pokemon: PokemonMap,
  setSwappingIdx: Function,
  handleSwap: Function
}

const PokemonCard = (props: React.PropsWithChildren<PokemonCardProps>) => {
  const { pokemon, setSwappingIdx, handleSwap, index } = props;

  const dispatch = useDispatch();
  const items = useSelector((state: any) => {return state.itemReducer.items});
  const artwork = useSelector((state: any) => {return state.settingReducer.artwork});
  const team: PokemonMap[] = useSelector((state: any) => {return state.teamReducer.team});

  const heal = () => {
    if (team[index].stats[0] >= team[index].stats[1]) return;
    
    const newTeam = JSON.parse(JSON.stringify(team));
    const newItems = JSON.parse(JSON.stringify(items));

    const potion1 = items["potion1"] && items["potion1"].quantity > 0;
    const potion2 = items["potion2"] && items["potion2"].quantity > 0;
    const potion3 = items["potion3"] && items["potion3"].quantity > 0;
    const potion4 = items["potion4"] && items["potion4"].quantity > 0;

    if (!(potion1 || potion2 || potion3 || potion4)) return;

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

    dispatch(allActions.teamActions.setTeam(newTeam));
    dispatch(allActions.itemActions.setItems(newItems));
  }

  const swap = () => {
    setSwappingIdx(0);
    handleSwap(index);
  }

  return (
    <motion.div 
      className={styles.container} 
      key="modal" 
      initial="hidden" 
      animate="visible" 
      variants={PokemonJoin}
      transition={{duration: 0.2, type: "spring"}} 
      onDragStart={() => setSwappingIdx(index)}
      onDragEnter={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => handleSwap(index)}
      draggable
      >
      <div className={styles.topRow}>
        <img className={styles.pokemonImage} src={pokemon.sprites[artwork]} alt={"An image of " + pokemon.name}></img>
        <div className={styles.pokemonInfo}>
          <strong className={styles.pokemonName}>{pokemon.name}</strong>
          <p className={styles.pokemonLevel}>{"LEVEL: " + pokemon.level}</p>
        </div>
        {index !== 0 && <Button className={styles.swapButton} variant="contained" onClick={swap}>SWAP</Button>}
      </div>
      <div className={styles.bottomRow}>
        <div className={styles.healthBarWrapper}>
          <div className={styles.healthBar} style={{width: Math.floor(pokemon.stats[0] / pokemon.stats[1] * 100) + "%"}}>
            <p className={styles.healthValue}>{Math.floor(pokemon.stats[0])}/{Math.floor(pokemon.stats[1])}</p>
          </div>
        </div>
        <Button className={styles.healButton} variant="contained" onClick={heal}>HEAL</Button>
      </div>
    </motion.div>
  )
}

export default PokemonCard;