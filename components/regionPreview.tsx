// React and Styling
import React, { useEffect, useState } from 'react';
import styles from '../styles/RegionPreview.module.scss';

// Animations
import { motion, AnimatePresence } from 'framer-motion';
import DropIn from '../animations/dropIn';

// MUI
import { Button, ClickAwayListener } from '@mui/material';

// Interfaces 
import PokedexMap from '../interfaces/PokedexMap';

// Constants
import StarterPokemon from '../constants/StarterPokemon';
import StatMap from '../constants/StatMap';
import TypeColorSchemes from '../constants/TypeColorSchemes';

// Components
import StarterCard from './starterCard';

interface RegionPreviewProps {
  region: string,
  pokedex: PokedexMap,
  unlocked: boolean,
  exit: Function
}

const RegionPreview = (props: React.PropsWithChildren<RegionPreviewProps>) => {
  const [starterPokemon, setStarterPokemon] = useState<string[]>([]);
  const [discoveredPokemon, setDiscoveredPokemon] = useState<string[]>([]);
  const [starter, setStarter] = useState("");
  const [artwork, setArtwork] = useState("");
  const [theme, setTheme] = useState("");
  const { region, pokedex, unlocked, exit } = props;

  useEffect(() => {
    setStarterPokemon(StarterPokemon[region]);
    setStarter(StarterPokemon[region][Math.floor(Math.random() * 3)]);
  }, [region]);

  useEffect(() => {
    if (starter === "") return;

    setTheme(TypeColorSchemes[pokedex[starter].types[0]]);
  }, [starter, pokedex])

  useEffect(() => {
    const discovered = localStorage.getItem("discoveredPokemon") || '[]';
    setDiscoveredPokemon(JSON.parse(discovered));

    const artwork = localStorage.getItem('artwork') || 'official';
    setArtwork(artwork);
  }, []);

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
                  <div className={styles.leftContainer}>
                    <h2 className={styles.regionTitle}>{region}</h2>
                    <div className={styles.starters}>
                      {starterPokemon.map((pokemon, idx) => {
                        return <StarterCard 
                        pokemon={pokedex[pokemon]}
                        artwork={artwork}
                        select={selectStarter} 
                        selected={starter === pokemon} 
                        key={idx}></StarterCard>
                      })}
                    </div>
                    <div className={styles.statsAndTypes}>
                      <div className={styles.buttonContainer}>
                        <Button variant="contained" onClick={reset} className={styles.exitButton}>EXIT</Button>
                        <Button variant="contained" onClick={reset} className={styles.playButton}>PLAY</Button>
                      </div>
                      <div className={styles.typesAndSelected}>
                        <strong className={styles.selectedPokemonName}>{starter}</strong>
                        <img className={styles.selectedPokemonImage} src={pokedex[starter].sprites[artwork]} alt={"An image of " + starter}></img>
                        <div className={styles.types}>
                          {pokedex[starter].types.map((type, idx) => {
                            return <p className={styles.type} key={idx} style={{backgroundColor: TypeColorSchemes[type]}}>{type}</p>
                          })}
                        </div>
                      </div>
                      <div className={styles.stats}>
                        {pokedex[starter].stats.map((stat, idx) => {
                          return <div className={styles.stat} key={idx}>
                            <p className={styles.statName}>{StatMap[idx]}</p>
                            <div className={styles.statBarWrapper}>
                              <div className={styles.statBar} style={{width: stat / 1.5 + "%", backgroundColor: theme}}>
                                <p className={styles.statValue}>{stat}</p>
                              </div>
                            </div>
                          </div>
                        })}
                      </div>
                    </div>
                  </div>
                  <div className={styles.rightContainer}>
                    <strong className={styles.pokedexHeader}>Pokedex Entries</strong>
                    {Object.keys(pokedex).sort().map((pokemon, idx) => {
                      return discoveredPokemon.includes(pokedex[pokemon].name) ? 
                      <div className={styles.pokedexEntry} key={idx}>
                        <img className={styles.pokedexImage} src={pokedex[pokemon].sprites[artwork]} alt={"An image of " + pokedex[pokemon].name}></img>
                        <p>{pokedex[pokemon].name}</p> 
                      </div> :
                      <div className={styles.pokedexEntry} key={idx}>
                        <p>???</p> 
                      </div>
                    })}
                  </div>
                </motion.div>
              }
            </AnimatePresence>
        </div>
      </ClickAwayListener>
    </div>
  )
}

export default RegionPreview;