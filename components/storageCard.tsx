// React and Styling
import React from 'react';
import styles from '../styles/StorageCard.module.scss';

// MUI
import { Button } from '@mui/material';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

interface StorageCardProps {
  artwork: string,
  index: number,
  pokemon: PokemonMap,
  team?: PokemonMap[],
  setTeam: Function
}

const StorageCard = (props: React.PropsWithChildren<StorageCardProps>) => {
  const { pokemon, artwork, index, team, setTeam } = props;

  return (
    <div className={styles.container}>
      <img className={styles.image} src={pokemon.sprites[artwork]} alt={"An image of " + pokemon.name}></img>
      <p className={styles.text}>{pokemon.name}</p>
      <p className={styles.text}>{"LEVEL " + pokemon.level}</p>
    </div>
  )
}

export default StorageCard;