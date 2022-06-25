// React and Styling
import React from 'react';
import styles from '../styles/PokemonCard.module.scss';

// MUI
import { Button } from '@mui/material';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

interface PokemonCardProps {
  artwork: string,
  pokemon: PokemonMap,
}

const PokemonCard = (props: React.PropsWithChildren<PokemonCardProps>) => {
  const { pokemon, artwork } = props;

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <img className={styles.pokemonImage} src={pokemon.sprites[artwork]} alt={"An image of " + pokemon.name}></img>
        <div className={styles.pokemonInfo}>
          <strong className={styles.pokemonName}>{pokemon.name}</strong>
          <p className={styles.pokemonLevel}>{"LEVEL: " + pokemon.level}</p>
        </div>
      </div>
      <div className={styles.bottomRow}>
        <Button variant="contained">HEAL</Button>
      </div>
    </div>
  )
}

export default PokemonCard