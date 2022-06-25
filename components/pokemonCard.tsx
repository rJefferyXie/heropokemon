// React and Styling
import React, { useState } from 'react';
import styles from '../styles/PokemonCard.module.scss';

// MUI
import { Button } from '@mui/material';

// Constants
import TypeColorSchemes from '../constants/TypeColorSchemes';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

interface PokemonCardProps {
  artwork: string,
  pokemon: PokemonMap,
}

const PokemonCard = (props: React.PropsWithChildren<PokemonCardProps>) => {
  const { pokemon, artwork } = props;
  const [health, setHealth] = useState(pokemon.stats[0]);

  const takeDamage = () => {
    setHealth(health - 1);
  }

  const heal = () => {
    setHealth(pokemon.stats[1]);
  }

  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        <img className={styles.pokemonImage} src={pokemon.sprites[artwork]} alt={"An image of " + pokemon.name} onClick={takeDamage}></img>
        <div className={styles.pokemonInfo}>
          <strong className={styles.pokemonName}>{pokemon.name}</strong>
          <p className={styles.pokemonLevel}>{"LEVEL: " + pokemon.level}</p>
        </div>
      </div>
      <div className={styles.bottomRow}>
        <div className={styles.healthBarWrapper}>
          <p className={styles.healthBar} style={{width: Math.floor(health / pokemon.stats[1] * 100) + "%"}}></p>
          <p className={styles.healthValue}>{Math.floor(health)}</p>
        </div>
        <Button className={styles.healButton} variant="contained" onClick={heal}>HEAL</Button>
      </div>
    </div>
  )
}

export default PokemonCard