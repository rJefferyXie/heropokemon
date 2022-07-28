// React and Styling
import React from 'react';
import styles from '../styles/StorageCard.module.scss';

// MUI
import { Button } from '@mui/material';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

// Animations
import { motion } from 'framer-motion';
import PokemonJoin from '../animations/pokemonJoin';

// Redux
import { useSelector } from 'react-redux';

interface StorageCardProps {
  index: number,
  pokemon: PokemonMap,
  setSwapping: Function,
  setSwappingIdx: Function,
  setReleasing: Function,
  setReleasingIdx: Function
}

const StorageCard = (props: React.PropsWithChildren<StorageCardProps>) => {
  const { pokemon, index, setSwapping, setSwappingIdx, setReleasing, setReleasingIdx } = props;

  const artwork = useSelector((state: any) => {return state.settingReducer.artwork});

  const swap = () => {
    setSwapping(true);
    setSwappingIdx(index);
  }

  const select = () => {
    setReleasing(pokemon);
    setReleasingIdx(index);
  }

  return (
    <motion.div 
      className={styles.container}
      key="modal" 
      initial="hidden" 
      animate="visible" 
      variants={PokemonJoin}
      transition={{duration: 0.2, type: "spring"}} 
      >
      <img className={styles.image} src={pokemon.sprites[artwork]} alt={"An image of " + pokemon.name}></img>
      <div className={styles.pokemonInfo}>
        <strong className={styles.pokemonName}>{pokemon.name}</strong>
        <p className={styles.pokemonLevel}>{"LEVEL " + pokemon.level}</p>
      </div>
      <div className={styles.buttonContainer}>
        <Button className={styles.swapButton} variant="contained" onClick={swap}>SWAP</Button>
        <Button className={styles.releaseButton} variant="contained" onClick={select}>FREE</Button>
      </div>
    </motion.div>
  );
}

export default StorageCard;