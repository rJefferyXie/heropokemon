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
  setSwapping: Function,
  setSwappingIdx: Function,
  handleSwap: Function
}

const PokemonCard = (props: React.PropsWithChildren<PokemonCardProps>) => {
  const { pokemon, setSwapping, setSwappingIdx, handleSwap, index } = props;

  const dispatch = useDispatch();
  const team: PokemonMap[] = useSelector((state: any) => {return state.teamReducer.team});
  const artwork = useSelector((state: any) => {return state.settingReducer.artwork});

  const heal = () => {
    const newTeam = JSON.parse(JSON.stringify(team));
    newTeam[index].stats[0] = newTeam[index].stats[1];
    dispatch(allActions.teamActions.setTeam(newTeam));
  }

  const swap = () => {
    setSwapping(true);
    setSwappingIdx(index);
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
        {index === 0 && <Button className={styles.swapButton} variant="contained" onClick={swap}>SWAP</Button>}
      </div>
      <div className={styles.bottomRow}>
        <div className={styles.healthBarWrapper}>
          <div className={styles.healthBar} style={{width: Math.floor(pokemon.stats[0] / pokemon.stats[1] * 100) + "%"}}>
            <p className={styles.healthValue}>{Math.floor(pokemon.stats[0])}/{pokemon.stats[1]}</p>
          </div>
        </div>
        <Button className={styles.healButton} variant="contained" onClick={heal}>HEAL</Button>
      </div>
    </motion.div>
  )
}

export default PokemonCard