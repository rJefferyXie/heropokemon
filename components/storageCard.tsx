// React and Styling
import React from 'react';
import styles from '../styles/StorageCard.module.scss';

// MUI
import { Button } from '@mui/material';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

// Redux
import { useSelector } from 'react-redux';

interface StorageCardProps {
  index: number,
  pokemon: PokemonMap,
  setSwapping: Function,
  setSwappingIdx: Function,
}

const StorageCard = (props: React.PropsWithChildren<StorageCardProps>) => {
  const { pokemon, index, setSwapping, setSwappingIdx } = props;
  const artwork = useSelector((state: any) => {return state.settingReducer.artwork});

  const swap = () => {
    setSwapping(true);
    setSwappingIdx(index);
  }

  return (
    <div className={styles.container}>
      <img className={styles.image} src={pokemon.sprites[artwork]} alt={"An image of " + pokemon.name}></img>
      <div className={styles.pokemonInfo}>
        <strong className={styles.pokemonName}>{pokemon.name}</strong>
        <p className={styles.pokemonLevel}>{"LEVEL " + pokemon.level}</p>
      </div>
      <Button className={styles.swapButton} variant="contained" onClick={swap}>SWAP</Button>
    </div>
  )
}

export default StorageCard;