// Next
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Head from 'next/head';

// React and Styling
import { useEffect, useState, useRef } from 'react';
import styles from '../styles/Game.module.scss';

// MUI
import { Snackbar, Button } from '@mui/material';

// Interfaces
import GameSave from '../interfaces/GameSave';
import PokemonMap from '../interfaces/PokemonMap';

// Game Functions
import getDPS from '../gameFunctions/getDPS';
import getEnemy from '../gameFunctions/getEnemy';
import getGameSave from '../gameFunctions/getGameSave';
import enemyFainted from '../gameFunctions/enemyFainted';
import getEnemyHealth from '../gameFunctions/getEnemyHealth';
import experienceForLevel from '../gameFunctions/experienceForLevel';

// Components
import Utilities from '../components/utilities';
import Tutorial from '../components/tutorial';
import Navbar from '../components/navbar';
import Floors from '../components/floors';
import Biomes from '../components/biomes';
import Enemy from '../components/enemy';
import DPS from '../components/dps';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const Game: NextPage = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const storage = useSelector((state: any) => {return state.storageReducer.storage});
  const alerts = useSelector((state: any) => {return state.alertReducer.alerts});
  const items = useSelector((state: any) => {return state.itemReducer.items});
  const pokedex = useSelector((state: any) => {return state.pokedexReducer});
  const regions = useSelector((state: any) => {return state.regionsReducer});
  const team = useSelector((state: any) => {return state.teamReducer.team});
  const biomes = useSelector((state: any) => {return state.biomeReducer});
  const bonus = useSelector((state: any) => {return state.bonusReducer});
  const enemy = useSelector((state: any) => {return state.enemyReducer});
  const game = useSelector((state: any) => {return state.gameReducer});

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const gameSaveCallback = useRef<any>();
  const gameFlowCallback = useRef<any>();
  const gameBonusCallback = useRef<any>();

  const closeSnackbar = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setShowAlert(false);
    dispatch(allActions.alertActions.nextAlert());
  }

  const nextEnemy = () => {
    if (enemy.enemy === undefined) return;

    if (enemy.enemiesLeft === 1) {
      dispatch(allActions.gameActions.setCurrentFloor(game.currentFloor + 1));
    } else {

      // level ups, enemy joining team, and evolutions
      const { newTeam, newStorage, joinMessage } = enemyFainted(team, storage, pokedex.pokedex, enemy.enemy, bonus.bonuses["kindSoul"]);
      dispatch(allActions.teamActions.setTeam(newTeam));
      dispatch(allActions.storageActions.setStorage(newStorage));
      joinMessage !== undefined && dispatch(allActions.alertActions.addAlert(joinMessage));

      // calculate enemy hp
      const enemyHP = getEnemyHealth(enemy.enemy, game.currentFloor);

      // calculate currency and get the next enemy
      const goldDropped = Math.floor(1 + (enemyHP / 10) * (1 + bonus.bonuses["fortune"].level * 0.1));
      dispatch(allActions.gameActions.setCurrency(game.currency + goldDropped));
      dispatch(allActions.bonusActions.setExperience(bonus.experience + goldDropped));
      dispatch(allActions.enemyActions.setEnemiesLeft(enemy.enemiesLeft - 1));

      // calculate if player has leveled up
      let levelUps = 1;
      while ((bonus.experience + goldDropped) >= experienceForLevel(bonus.level + levelUps)) {
        levelUps += 1;
        dispatch(allActions.bonusActions.setBonusPoints(bonus.bonusPoints + 1));
        dispatch(allActions.bonusActions.setLevel(bonus.level + 1));
      }
    }
  }

  useEffect(() => {
    if (!router) return;

    const gameSave: GameSave | false = getGameSave(regions.selected);
    if (gameSave === false) {
      router.push("/");
      return;
    } 

    dispatch(allActions.biomeActions.setActiveBiome(gameSave.biomes[gameSave.biomes.length - 1]));
    dispatch(allActions.gameActions.setHighestFloor(gameSave.highestFloor));
    dispatch(allActions.bonusActions.setBonusPoints(gameSave.bonusPoints));
    dispatch(allActions.bonusActions.setExperience(gameSave.experience));
    dispatch(allActions.gameActions.setGameBeaten(gameSave.gameBeaten));
    dispatch(allActions.gameActions.setCurrentFloor(gameSave.floor));
    dispatch(allActions.storageActions.setStorage(gameSave.storage));
    dispatch(allActions.gameActions.setCurrency(gameSave.currency));
    dispatch(allActions.bonusActions.setBonuses(gameSave.bonuses));
    dispatch(allActions.biomeActions.setBiomes(gameSave.biomes));
    dispatch(allActions.gameActions.setBadges(gameSave.badges));
    dispatch(allActions.bonusActions.setLevel(gameSave.level));
    dispatch(allActions.itemActions.setItems(gameSave.items));
    dispatch(allActions.teamActions.setTeam(gameSave.team));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (!pokedex.pokedex) return;
    const enemyInfo = getEnemy(pokedex.pokedex, game.currentFloor, biomes.activeBiome);
    dispatch(allActions.enemyActions.setEnemy(enemyInfo));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokedex.pokedex, enemy.enemiesLeft, game.currentFloor]);

  useEffect(() => {
    dispatch(allActions.enemyActions.setEnemiesLeft(10));
    dispatch(allActions.gameActions.setHighestFloor(Math.max(game.currentFloor, game.highestFloor)));

    if (game.highestFloor === 101 && game.currentFloor === 101 && game.gameBeaten === false) {
      dispatch(allActions.gameActions.setGameBeaten(true));
      dispatch(allActions.gameActions.setUnlockPoints(game.unlockPoints + 1));
      dispatch(allActions.alertActions.addAlert(`You have beaten the ${regions.selected} region! You may now unlock another region.`));
      saveGame();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.currentFloor, game.highestFloor]);

  useEffect(() => {
    gameSaveCallback.current = saveGame;
  });

  useEffect(() => {
    gameFlowCallback.current = gameFlow;
  });

  useEffect(() => {
    gameBonusCallback.current = bonusCalculations;
  })

  const saveGame = () => {
    localStorage.setItem(regions.selected + 'Save', JSON.stringify({
      "floor": game.highestFloor,
      "highestFloor": game.highestFloor,
      "team": team,
      "storage": storage,
      "badges": game.badges,
      "biomes": biomes.biomes,
      "currency": game.currency,
      "items": items,
      "level": bonus.level,
      "bonuses": bonus.bonuses,
      "experience": bonus.experience,
      "bonusPoints": bonus.bonusPoints,
      "gameBeaten": game.gameBeaten
    })); 
  }

  const gameFlow = () => {
    if (!enemy.enemy || team.length === 0) return;

    const { playerDPS, enemyDPS } = getDPS(enemy.enemy, team[0], bonus.bonuses["vigor"]);
    const newTeam = JSON.parse(JSON.stringify(team));

    if (bonus.bonuses["regeneration"].level >= 1) {
      const regenerationAmount = ((bonus.bonuses["regeneration"].level * 2) / 100);
      newTeam.map((pokemon: PokemonMap) => {
        if (Math.floor(pokemon.stats[0]) > 0) {
          pokemon.stats[0] = Math.min(pokemon.stats[0] + regenerationAmount, pokemon.stats[1]);
        }
      });
    }

    newTeam[0].stats[0] = Math.max(newTeam[0].stats[0] - enemyDPS, 0);

    let fainted = 0;
    newTeam.map((pokemon: PokemonMap) => {
      if (Math.floor(pokemon.stats[0]) === 0) fainted++;
    });

    if (fainted === 6) {
      newTeam.map((pokemon: PokemonMap) => {
        pokemon.stats[0] = pokemon.stats[1]
      });

      if (game.currentFloor > 1) {
        dispatch(allActions.gameActions.setCurrentFloor(game.currentFloor - 1));
      }

      dispatch(allActions.teamActions.setTeam(newTeam));
      dispatch(allActions.enemyActions.setEnemiesLeft(10));
      return;
    }

    dispatch(allActions.teamActions.setTeam(newTeam));

    if (newTeam[0].stats[0] <= 0) {
      const newEnemy = JSON.parse(JSON.stringify(enemy.enemy));
      const enemyHP = getEnemyHealth(enemy.enemy, game.currentFloor)
      newEnemy.stats[0] = Math.min(newEnemy.stats[0] + 0.2, enemyHP);
      
      dispatch(allActions.enemyActions.setEnemy(newEnemy));
      dispatch(allActions.damageActions.setPlayerDPS(playerDPS));
      return;
    } 

    const newEnemy = JSON.parse(JSON.stringify(enemy.enemy));
    newEnemy.stats[0] -= playerDPS;
    if (newEnemy.stats[0] <= 0) {
      nextEnemy();
      return;
    }

    dispatch(allActions.enemyActions.setEnemy(newEnemy));
    dispatch(allActions.damageActions.setPlayerDPS(playerDPS));
  }

  const bonusCalculations = () => {
    if (showAlert) setShowAlert(false);

    if (alerts.length > 0) {
      setShowAlert(true);
      setAlertMessage(alerts[0]);
      dispatch(allActions.alertActions.nextAlert());
    }

    if (!bonus.bonuses["swapper"].activated && !bonus.bonuses["healer"].activated) return;

    const newTeam = JSON.parse(JSON.stringify(team));
    if (bonus.bonuses["swapper"].activated) {
      let bestPokemon = {
        index: 0, 
        dps: 0 
      }

      team.map((_: any, idx: number) => {
        if (Math.floor(team[idx].stats[0]) <= 0) return;

        const { playerDPS } = getDPS(enemy.enemy, team[idx], bonus.bonuses["vigor"]);
        if (playerDPS > bestPokemon.dps) {
          bestPokemon.index = idx;
          bestPokemon.dps = playerDPS;
        }
      });

      if (bestPokemon.index > 0) {
        [newTeam[0], newTeam[bestPokemon.index]] = [newTeam[bestPokemon.index], newTeam[0]];
      }
    }

    if (bonus.bonuses["healer"].activated) {
      const newItems = JSON.parse(JSON.stringify(items));
      team.map((pokemon: PokemonMap, idx: number) => {
        if (pokemon.stats[1] - pokemon.stats[0] >= 120) {
          if (items["potion3"] && items["potion3"].quantity > 0) {
            newTeam[idx].stats[0] += 120;
            newItems["potion3"].quantity -= 1;
            return;
          } else if (items["potion4"] && items["potion4"].quantity > 0) {
            newTeam[idx].stats[0] = newTeam[idx].stats[1];
            newItems["potion4"].quantity -= 1;
            return;
          }
        }

        if (pokemon.stats[1] - pokemon.stats[0] >= 50) {
          if (items["potion2"] && items["potion2"].quantity > 0) {
            newTeam[idx].stats[0] += 50;
            newItems["potion2"].quantity -= 1;
            return;
          }
        }

        if (pokemon.stats[1] - pokemon.stats[0] >= 20) {
          if (items["potion1"] && items["potion1"].quantity > 0) {
            newTeam[idx].stats[0] += 20;
            newItems["potion1"].quantity -= 1;
            return;
          }
        } 
      });

      dispatch(allActions.itemActions.setItems(newItems));
    }

    dispatch(allActions.teamActions.setTeam(newTeam));
  }

  useEffect(() => {
    if (!regions.selected) return;
    
    const gameFlowTick = () => gameFlowCallback.current();
    const gameFlowInterval = setInterval(gameFlowTick, 100);

    const gameBonusTick = () => gameBonusCallback.current();
    const gameBonusInterval = setInterval(gameBonusTick, 2000);

    const gameSaveTick = () => gameSaveCallback.current();
    const gameSaveInterval = setInterval(gameSaveTick, 60000);

    return () => {
      clearInterval(gameFlowInterval);
      clearInterval(gameBonusInterval);
      clearInterval(gameSaveInterval);
    };        
  }, [regions.selected]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{"HeroPokemon - " + regions.selected + " region"}</title>
        <meta name="description" content={"Playing HeroPokemon in the " + regions.selected + " region."} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar></Navbar>
      {/* <Tutorial></Tutorial> */}
      <Utilities></Utilities>

      <Snackbar 
        open={showAlert}
        message={alertMessage}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        action={
          <Button 
            className={styles.exitButton} 
            variant="contained" 
            onClick={closeSnackbar}
          >
          DISMISS
          </Button>
        }
      ></Snackbar>

      <div className={styles.column}>
        <div className={styles.row}>
          <DPS></DPS>
          <Floors></Floors>
        </div>

        <strong className={styles.enemiesLeft}>{enemy.enemiesLeft + " wild pokemon left."}</strong>  
        <Biomes></Biomes>

        {Object.keys(enemy.enemy).length > 0 && <Enemy></Enemy>}
      </div>

    </div>
  )
}

export default Game;