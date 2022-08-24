// Next
import { useRouter } from 'next/router';

// React and Styling
import { useEffect, useState } from 'react';
import styles from '../styles/RegionPreview.module.scss';

// Animations
import { motion, AnimatePresence } from 'framer-motion';
import DropInTop from '../animations/dropInTop';

// MUI
import { Button, ClickAwayListener, Snackbar } from '@mui/material';

// Interfaces 
import PokedexMap from '../interfaces/PokedexMap';
import GameSave from '../interfaces/GameSave';

// Constants
import StatMap from '../constants/StatMap';
import StarterPokemon from '../constants/StarterPokemon';
import TypeColorSchemes from '../constants/TypeColorSchemes';

// Game Functions
import createGameSave from '../gameFunctions/CreateGameSave';

// Components
import StarterCard from './starterCard';
import PokemonPreview from './pokemonPreview';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const RegionPreview = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const regions = useSelector((state: any) => {return state.regionsReducer});
  const artwork = useSelector((state: any) => {return state.settingReducer.artwork});
  const unlockPoints = useSelector((state: any) => {return state.gameReducer.unlockPoints});
  const pokedex: PokedexMap = useSelector((state: any) => {return state.pokedexReducer.pokedex});
  
  const [theme, setTheme] = useState("");
  const [starter, setStarter] = useState("");
  const [showError, setShowError] = useState(false);
  const [showUnlock, setShowUnlock] = useState(false);
  const [starterPokemon, setStarterPokemon] = useState<string[]>([]);

  // @ts-expect-error
  const [gameSave, setGameSave] = useState<GameSave>({});

  useEffect(() => {
    // Set the starter pokemon to the selected region.
    setStarterPokemon(StarterPokemon[regions.selected]);
    setStarter(StarterPokemon[regions.selected][Math.floor(Math.random() * 3)]);

    const game = localStorage.getItem(regions.selected + 'Save');
    if (game) setGameSave(JSON.parse(game))
  }, [regions.selected]);

  useEffect(() => {
    if (starter === "") return;
    setTheme(TypeColorSchemes[pokedex[starter].types[0]]);
  }, [starter, pokedex]);

  const reset = () => {
    setStarterPokemon([]);
  }

  const exit = () => {
    dispatch(allActions.regionsActions.setRegion(''));
  }

  const play = () => {    
    dispatch(allActions.gameActions.setHighestFloor(1));
    dispatch(allActions.gameActions.setCurrentFloor(1));

    // If a game save exists, just play.
    if (Object.keys(gameSave).length > 0) {
      router.push('/game');
      return;
    }

    // If no game save, create a new game save.
    const newGame = createGameSave(pokedex[starter]);
    localStorage.setItem(regions.selected + 'Save', JSON.stringify(newGame));
    router.push('/game');
  }

  const unlock = () => {
    if (unlockPoints === 0) {
      setShowError(true);
      return;
    }

    dispatch(allActions.regionsActions.unlockRegion(regions.selected));
    dispatch(allActions.gameActions.setUnlockPoints(unlockPoints - 1));
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
                  onClick={unlock}
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
                  <motion.div className={styles.container} key="modal" initial="hidden" animate="visible" exit="exit" variants={DropInTop}>
                    
                    <h1 className={styles.regionTitle}>{regions.selected}</h1>
                    <div className={styles.topRow}>
                      <p className={styles.currency}>{"Currency: $" + gameSave.currency}</p>
                      <p className={styles.highestFloor}>{"Highest Floor: " + gameSave.floor}</p>
                    </div>
                    
                    <h3 className={styles.teamHeader}>YOUR TEAM</h3>
                    <div className={styles.teamWrapper}>
                      {gameSave.team.map((pokemon, idx) => {
                        return <PokemonPreview 
                        pokemon={pokemon} 
                        key={idx}
                        >
                        </PokemonPreview>
                      })}
                    </div>

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
                          onClick={regions.regions.includes(regions.selected) ? play : unlock} 
                          className={styles.playButton}
                        >
                        Continue Game
                        </Button>
                      </div>
                  </motion.div>
                }
              </AnimatePresence> :

              <AnimatePresence onExitComplete={() => exit()}>
                {starterPokemon.length > 0 &&
                  <motion.div className={styles.container} key="modal" initial="hidden" animate="visible" exit="exit" variants={DropInTop}>
                    <h2 className={styles.regionTitle}>{regions.selected}</h2>
                    <div className={styles.starters}>
                      {starterPokemon.map((pokemon, idx) => {
                        return <StarterCard 
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
                          onClick={regions.regions.includes(regions.selected) ? play : unlock} 
                          className={styles.playButton}
                        >
                        {regions.regions.includes(regions.selected) ? "PLAY" : "UNLOCK"}
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
                          return (
                            <div className={styles.stat} key={idx}>
                              <p className={styles.statName}>{StatMap[idx]}</p>
                              <div className={styles.statBarWrapper}>
                                <div className={styles.statBar} style={{width: stat / 1.5 + "%", backgroundColor: theme}}>
                                  <p className={styles.statValue}>{stat}</p>
                                </div>
                              </div>
                            </div>
                          );
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
  );
}

export default RegionPreview;