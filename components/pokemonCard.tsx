// React and Styling
import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/PokemonCard.module.scss';

// Animations
import { motion } from 'framer-motion';
import DropInRight from '../animations/dropInRight';

// MUI
import { Button } from '@mui/material';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

interface PokemonCardProps {
  dps: number,
  artwork: string,
  firstSlot: boolean,
  pokemon: PokemonMap
}

const PokemonCard = (props: React.PropsWithChildren<PokemonCardProps>) => {
  const { pokemon, firstSlot, dps, artwork } = props;
  const [health, setHealth] = useState(pokemon.stats[0]);
  const savedCallback = useRef<any>();

  const heal = () => {
    setHealth(pokemon.stats[1]);
  }

  const dpsCallback = () => {
    if (health > 0) setHealth(Math.max(health - dps, 0));
  }

  useEffect(() => {
    savedCallback.current = dpsCallback;
  });

  // interval for dealing damage based on team's dps
  useEffect(() => {
    if (!firstSlot) return;

    const tick = () => {
      savedCallback.current();
    }

    const dpsInterval = setInterval(tick, 100);
    return () => clearInterval(dpsInterval);
  }, [firstSlot]);

  useEffect(() => {
    setHealth(health => pokemon.stats[0] - (pokemon.stats[0] - health));
  }, [pokemon]);

  return (
    <motion.div className={styles.container} key="modal" initial="hidden" animate="visible" exit="exit" variants={DropInRight}>
      <div className={styles.topRow}>
        <img className={styles.pokemonImage} src={pokemon.sprites[artwork]} alt={"An image of " + pokemon.name}></img>
        <div className={styles.pokemonInfo}>
          <strong className={styles.pokemonName}>{pokemon.name}</strong>
          <p className={styles.pokemonLevel}>{"LEVEL: " + pokemon.level}</p>
        </div>
      </div>
      <div className={styles.bottomRow}>
        <div className={styles.healthBarWrapper}>
          <div className={styles.healthBar} style={{width: Math.floor(health / pokemon.stats[1] * 100) + "%"}}>
            <p className={styles.healthValue}>{`${Math.floor(health)}/${pokemon.stats[1]}`}</p>
          </div>
        </div>
        <Button className={styles.healButton} variant="contained" onClick={heal}>HEAL</Button>
      </div>
    </motion.div>
  )
}

export default PokemonCard