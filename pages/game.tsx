// Next
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Head from 'next/head';

// React and Styling
import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/Game.module.scss';

// MUI
import { Snackbar, Button } from '@mui/material';

// Interfaces
import GameSave from '../interfaces/GameSave';

// Game Functions
import getDPS from '../gameFunctions/getDPS';
import getEnemy from '../gameFunctions/getEnemy';
import getGameSave from '../gameFunctions/getGameSave';
import enemyFainted from '../gameFunctions/enemyFainted';

// Components
import Navbar from '../components/navbar';
import Floors from '../components/floors';
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
  const enemy = useSelector((state: any) => {return state.enemyReducer});
  const game = useSelector((state: any) => {return state.gameReducer});

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const gameSaveCallback = useRef<any>();
  const gameFlowCallback = useRef<any>();

  const saveGame = () => {
    localStorage.setItem(regions.selected + 'Save', JSON.stringify({
      "floor": game.highestFloor,
      "currency": game.currency,
      "storage": storage,
      "badges": game.badges,
      "items": items,
      "team": team
    }));  
  }

  const nextEnemy = () => {
    if (enemy.enemy === undefined) return;

    if (enemy.enemiesLeft === 1) {
      dispatch(allActions.gameActions.setCurrentFloor(game.currentFloor + 1));
    } else {

      // level ups, enemy joining team, and evolutions
      const { newTeam, newStorage } = enemyFainted(team, storage, pokedex.pokedex, enemy.enemy);
      dispatch(allActions.teamActions.setTeam(newTeam));
      dispatch(allActions.storageActions.setStorage(newStorage));

      // calculate currency and get the next enemy
      const newCurrency = game.currency + Math.floor((enemy.enemy.stats[1] / enemy.enemy.level) * (1 + enemy.enemy.level / 100));
      dispatch(allActions.gameActions.setCurrency(newCurrency));
      dispatch(allActions.enemyActions.setEnemiesLeft(enemy.enemiesLeft - 1));
    }
  }

  useEffect(() => {
    if (!router) return;

    const gameSave: GameSave | false = getGameSave(regions.selected);
    if (gameSave === false) {
      router.push("/");
      return;
    } 

    dispatch(allActions.gameActions.setCurrentFloor(gameSave.floor));
    dispatch(allActions.gameActions.setHighestFloor(gameSave.floor));
    dispatch(allActions.storageActions.setStorage(gameSave.storage));
    dispatch(allActions.gameActions.setCurrency(gameSave.currency));
    dispatch(allActions.gameActions.setBadges(gameSave.badges));
    dispatch(allActions.itemActions.setItems(gameSave.items));
    dispatch(allActions.teamActions.setTeam(gameSave.team));
    dispatch(allActions.alertActions.nextAlert());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (pokedex.pokedex === {}) return;
    const enemyInfo = getEnemy(pokedex.pokedex, game.currentFloor);
    dispatch(allActions.enemyActions.setEnemy(enemyInfo));

    const enemyName = enemyInfo.name;
    const inPokedex = pokedex.entries.includes(enemyName);
    const inAlerts = alerts.includes(enemyName.toUpperCase() + " added to the pokedex.");
    if (!inPokedex && !inAlerts) {
      dispatch(allActions.pokedexActions.addEntry(enemyName));
      dispatch(allActions.alertActions.addAlert(enemyName.toUpperCase() + " added to the pokedex."));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokedex.pokedex, enemy.enemiesLeft, game.currentFloor]);

  useEffect(() => {
    dispatch(allActions.enemyActions.setEnemiesLeft(10));
    dispatch(allActions.gameActions.setHighestFloor(Math.max(game.currentFloor, game.highestFloor)));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.currentFloor, game.highestFloor]);

  useEffect(() => {
    gameSaveCallback.current = saveGame;
  });

  useEffect(() => {
    gameFlowCallback.current = gameFlow;
  });

  const gameFlow = () => {
    if (enemy.enemy === {} || team.length === 0) return;

    const { playerDPS, enemyDPS } = getDPS(enemy.enemy, team[0]);

    const newTeam = JSON.parse(JSON.stringify(team));
    newTeam[0].stats[0] -= enemyDPS;
    if (newTeam[0].stats[0] <= 0) {
      const newEnemy = JSON.parse(JSON.stringify(enemy.enemy));
      newEnemy.stats[0] = Math.min(newEnemy.stats[0] + 0.2, newEnemy.stats[1]);
      dispatch(allActions.enemyActions.setEnemy(newEnemy));
      return;
    }

    dispatch(allActions.teamActions.setTeam(newTeam));

    const newEnemy = JSON.parse(JSON.stringify(enemy.enemy));
    newEnemy.stats[0] -= playerDPS;
    if (newEnemy.stats[0] <= 0) {
      nextEnemy();
      return;
    }

    dispatch(allActions.enemyActions.setEnemy(newEnemy));
    dispatch(allActions.damageActions.setPlayerDPS(playerDPS));
  }

  useEffect(() => {
    if (!regions.selected) return;
    
    const gameSaveTick = () => gameSaveCallback.current();
    const gameSaveInterval = setInterval(gameSaveTick, 300000);

    const gameFlowTick = () => gameFlowCallback.current();
    const gameFlowInterval = setInterval(gameFlowTick, 100);

    return () => {
      clearInterval(gameSaveInterval);
      clearInterval(gameFlowInterval);
    };        
  }, [regions.selected]);

  useEffect(() => {
    if (alerts.length <= 0) return;
    setShowAlert(true);
    setAlertMessage(alerts[0]);
  }, [alerts]);

  const closeSnackbar = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setShowAlert(false);
    dispatch(allActions.alertActions.nextAlert());
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>HeroPokemon - A Pokemon-Based Idle Game</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar></Navbar>

      <Snackbar 
        open={showAlert}
        message={alertMessage}
        autoHideDuration={3000}
        onClose={closeSnackbar}
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
          <div className={styles.spacer}></div>
        </div>
        <strong className={styles.enemiesLeft}>{enemy.enemiesLeft + " wild pokemon left."}</strong>  

        {Object.keys(enemy.enemy).length > 0 && <Enemy></Enemy>}
      </div>

    </div>
  )
}

export default Game;