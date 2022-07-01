// React and Styling
import React, { useState, useEffect } from 'react';
import styles from '../styles/PokemonCard.module.scss';

// Animations
import { motion, AnimatePresence } from 'framer-motion';
import DropInRight from '../animations/dropInRight';

// MUI
import { Button } from '@mui/material';

// Constants
import TypeColorSchemes from '../constants/TypeColorSchemes';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

interface PokemonCardProps {
  artwork: string,
  pokemon: PokemonMap
}

const PokemonCard = (props: React.PropsWithChildren<PokemonCardProps>) => {
  const { pokemon, artwork } = props;
  const [health, setHealth] = useState(pokemon.stats[0]);

  const getHit = () => {
    pokemon.stats[0] -= 2;
    setHealth(health - 2);
  }

  const heal = () => {
    pokemon.stats[0] = pokemon.stats[1];
    setHealth(pokemon.stats[1]);
  }

  useEffect(() => {
    setHealth(pokemon.stats[0]);
  }, [pokemon]);

  return (
    <motion.div className={styles.container} key="modal" initial="hidden" animate="visible" exit="exit" variants={DropInRight}>
      <div className={styles.topRow}>
        <img className={styles.pokemonImage} src={pokemon.sprites[artwork]} alt={"An image of " + pokemon.name} onClick={getHit}></img>
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