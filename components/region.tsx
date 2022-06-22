// React and Styling
import React, { useEffect, useState } from 'react';
import styles from '../styles/Region.module.scss';

// Animations
import { motion, AnimatePresence } from 'framer-motion';
import DropIn from '../animations/dropIn';

// MUI
import { Button, ClickAwayListener } from '@mui/material';

// Constants
import StarterPokemon from '../constants/StarterPokemon';

// Components
import StarterCard from './starterCard';

interface RegionProps {
  region: string,
  pokedex: {}
  unlocked: boolean,
  exit: Function
}

const Region = (props: React.PropsWithChildren<RegionProps>) => {
  const [starterPokemon, setStarterPokemon] = useState<string[]>([]);
  const [starter, setStarter] = useState("");
  const { region, pokedex, unlocked, exit } = props;

  useEffect(() => {
    setStarterPokemon(StarterPokemon[region]);
  }, [region]);

  const reset = () => {
    setStarterPokemon([]);
  }

  const selectStarter = (pokemon: string) => {
    setStarter(pokemon);
  }

  return (
    <div className={styles.overlay}>
      <ClickAwayListener onClickAway={reset}>
        <div className={styles.wrapper}>
          <AnimatePresence onExitComplete={() => exit()}>
              {starterPokemon.length > 0 &&
                <motion.div className={styles.container} key="modal" initial="hidden" animate="visible" exit="exit" variants={DropIn}>
                  <div className={styles.starters}>
                    {starterPokemon.map((pokemon, idx) => {
                      return <StarterCard 
                      name={pokemon} 
                      select={selectStarter} 
                      selected={starter === pokemon} 
                      key={idx}
                      ></StarterCard>
                    })}
                  </div>
                  <Button variant="contained" onClick={reset} className={styles.exitButton}>EXIT</Button>
                  <Button variant="contained" onClick={reset} className={styles.playButton}>PLAY</Button>
                </motion.div>
              }
            </AnimatePresence>
        </div>
      </ClickAwayListener>
    </div>
  )
}

export default Region;