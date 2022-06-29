// Next
import { useRouter } from 'next/router';

// React and Styling
import React, { useEffect, useState } from 'react';
import styles from '../styles/RegionPreview.module.scss';

// Animations
import { motion, AnimatePresence } from 'framer-motion';
import DropIn from '../animations/dropIn';

// MUI
import { Button, ClickAwayListener, Snackbar } from '@mui/material';

// Interfaces 
import PokedexMap from '../interfaces/PokedexMap';
import GameSave from '../interfaces/GameSave';

// Constants
import StatMap from '../constants/StatMap';
// import RegionImages from '../constants/RegionImages';
import StarterPokemon from '../constants/StarterPokemon';
import TypeColorSchemes from '../constants/TypeColorSchemes';

// Components
import StarterCard from './starterCard';

interface RegionPreviewProps {
  exit: Function,
  region: string,
  artwork: string,
  unlocked: boolean,
  pokedex: PokedexMap,
  discoveredPokemon: string[]
}

const RegionPreview = (props: React.PropsWithChildren<RegionPreviewProps>) => {
  const { region, artwork, unlocked, pokedex, discoveredPokemon, exit } = props;
  const router = useRouter();

  const [theme, setTheme] = useState("");
  const [starter, setStarter] = useState("");
  const [showError, setShowError] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);
  const [starterPokemon, setStarterPokemon] = useState<string[]>([]);

  // @ts-expect-error
  const [gameSave, setGameSave] = useState<GameSave>({});

  useEffect(() => {
    setStarterPokemon(StarterPokemon[region]);
    setStarter(StarterPokemon[region][Math.floor(Math.random() * 3)]);

    const game = localStorage.getItem(region + 'Save');
    if (game) setGameSave(JSON.parse(game))
  }, [region]);

  useEffect(() => {
    if (starter === "") return;
    setTheme(TypeColorSchemes[pokedex[starter].types[0]]);
  }, [starter, pokedex]);

  const reset = () => {
    setStarterPokemon([]);
  }

  const play = () => {    
    if (Object.keys(gameSave).length > 0) {
      localStorage.setItem('selectedRegion', region);
      router.push('/game');
      return;
    }

    const starterLevel = 5;
    const RegionTeam: PokedexMap = {};
    RegionTeam[starter] = pokedex[starter];
    RegionTeam[starter].level = starterLevel;

    // adjust pokemon stats according to pokemon level
    for (let i = 0; i < 6; i++) {
      const statBoost = Math.floor(Math.random() * starterLevel * 2);
      RegionTeam[starter].statBoosts[i] = statBoost;
      RegionTeam[starter].stats[i + 1] += statBoost;
    }

    RegionTeam[starter].stats[0] += RegionTeam[starter].statBoosts[0];
    
    localStorage.setItem(region + 'Save', JSON.stringify({
      "floor": 1,
      "currency": 0,
      "team": RegionTeam,
      "storage": {},
      "items": {},
      "badges": []
    }));

    localStorage.setItem('selectedRegion', region);
    router.push('/game');
  }

  const unlock = () => {
    setShowError(true);
  }

  const errorClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setShowError(false);
  }

  const unlockClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setShowUnlock(false);
  }

  const selectStarter = (pokemon: string) => {
    setStarter(pokemon);
  }

  return (
    <div className={styles.overlay}>
      <ClickAwayListener onClickAway={reset}>
        <div className={styles.wrapper}>
          <Snackbar
            open={showUnlock}
            message={"Unlock this region?"}
            onClose={unlockClose}
            action={
              <div>
                <Button 
                  className={styles.exitButton} 
                  variant="contained" 
                  onClick={unlockClose}
                >
                CANCEL
                </Button>
                <Button 
                  className={styles.playButton} 
                  variant="contained"
                >
                UNLOCK
                </Button>
              </div>
            }
          ></Snackbar>

          <Snackbar
            open={showError}
            message={"You cannot unlock any more regions at this moment. Keep playing to unlock more!"}
            autoHideDuration={6000}
            onClose={errorClose}
            action={
              <Button 
                className={styles.exitButton} 
                variant="contained" 
                onClick={errorClose}
              >
              DISMISS
              </Button>
            }
          ></Snackbar>

          {
          Object.keys(gameSave).length > 0 ? 
              <AnimatePresence onExitComplete={() => exit()}>
                {starterPokemon.length > 0 &&
                  <motion.div className={styles.container} key="modal" initial="hidden" animate="visible" exit="exit" variants={DropIn}>
                    <h2 className={styles.regionTitle}>{region}</h2>
                    <p>{"Currency: $" + gameSave.currency}</p>
                    <p>{"Floor: " + gameSave.floor}</p>
                    
                    {/* <div className={styles.badges}>
                      {[...Array(8)].map((_, idx) => {
                        return <img src={RegionImages[region + "Badge" + (idx + 1)]} alt={"Badge #" + idx} key={idx}></img>
                      })}
                    </div> */}

                    <div className={styles.buttonContainer}>
                        <Button 
                          variant="contained" 
                          onClick={reset} 
                          className={styles.exitButton}
                        >
                        EXIT
                        </Button>
                        <Button 
                          variant="contained" 
                          onClick={unlocked ? play : unlock} 
                          className={styles.playButton}
                        >
                        Continue Game
                        </Button>
                      </div>
                    <div className={styles.pokedex}>
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
              </AnimatePresence> :

              <AnimatePresence onExitComplete={() => exit()}>
                {starterPokemon.length > 0 &&
                  <motion.div className={styles.container} key="modal" initial="hidden" animate="visible" exit="exit" variants={DropIn}>
                    <h2 className={styles.regionTitle}>{region}</h2>
                    <div className={styles.starters}>
                      {starterPokemon.map((pokemon, idx) => {
                        return <StarterCard 
                          artwork={artwork}
                          select={selectStarter} 
                          selected={starter === pokemon} 
                          pokemon={pokedex[pokemon]}
                          key={idx}
                        ></StarterCard>
                      })}
                    </div>
                    <div className={styles.statsAndTypes}>
                      <div className={styles.buttonContainer}>
                        <Button 
                          variant="contained" 
                          onClick={reset} 
                          className={styles.exitButton}
                        >
                        EXIT
                        </Button>
                        <Button 
                          variant="contained" 
                          onClick={unlocked ? play : unlock} 
                          className={styles.playButton}
                        >
                        {unlocked ? "PLAY" : "UNLOCK"}
                        </Button>
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
                        {pokedex[starter].stats.slice(1).map((stat, idx) => {
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
                  </motion.div>
                }
            </AnimatePresence>
            }
        </div>
      </ClickAwayListener>
    </div>
  )
}

export default RegionPreview;