// Next
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Head from 'next/head';

// React and Styling
import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/Game.module.scss';

// MUI
import { Snackbar } from '@mui/material';

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
  const pokedex = useSelector((state: any) => {return state.pokedexReducer});
  const regions = useSelector((state: any) => {return state.regionsReducer});
  const game = useSelector((state: any) => {return state.gameReducer});
  const enemy = useSelector((state: any) => {return state.enemyReducer});

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const gameSaveCallback = useRef<any>();
  const gameFlowCallback = useRef<any>();

  useEffect(() => {
    if (!router) return;

    const game: GameSave | false = getGameSave(regions.selected);
    if (game === false) {
      router.push("/");
      return;
    } 

    dispatch(allActions.gameActions.setCurrentFloor(game.floor));
    dispatch(allActions.gameActions.setHighestFloor(game.floor));
    dispatch(allActions.gameActions.setCurrency(game.currency));
    dispatch(allActions.gameActions.setStorage(game.storage));
    dispatch(allActions.gameActions.setBadges(game.badges));
    dispatch(allActions.gameActions.setItems(game.items));
    dispatch(allActions.gameActions.setTeam(game.team));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (pokedex.pokedex === {}) return;
    const enemyInfo = getEnemy(pokedex.pokedex, game.currentFloor);
    dispatch(allActions.enemyActions.setEnemy(enemyInfo));

    const enemyName = enemyInfo.name;
    // if (!pokedex.entries.includes(enemyName)) {
    //   dispatch(allActions.pokedexActions.addEntry(enemyName));
    //   dispatch(allActions.gameActions.setAlerts(enemyName.toUpperCase() + " added to the pokedex."));
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokedex.pokedex, game.enemiesLeft]);

  useEffect(() => {
    dispatch(allActions.enemyActions.setEnemiesLeft(10));
    dispatch(allActions.gameActions.setHighestFloor(Math.max(game.currentFloor, game.highestFloor)));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.currentFloor, game.highestFloor]);

  const saveGame = () => {
    localStorage.setItem(regions.selected + 'Save', JSON.stringify({
      "floor": game.highestFloor,
      "currency": game.currency,
      "storage": game.storage,
      "team": game.team,
      "items": game.items,
      "badges": game.badges,
      "pokedex": pokedex.pokedex
    }));
  
    localStorage.setItem("discoveredPokemon", JSON.stringify(regions.entries));
  }

  useEffect(() => {
    gameSaveCallback.current = saveGame;
  });

  const gameFlow = () => {
    if (enemy.enemy === {} || game.team.length === 0) return;

    const { playerDPS, enemyDPS } = getDPS(enemy.enemy, game.team[0]);

    const newTeam = JSON.parse(JSON.stringify(game.team));
    newTeam[0].stats[0] -= enemyDPS;
    if (newTeam[0].stats[0] <= 0) {
      const newEnemy = JSON.parse(JSON.stringify(enemy.enemy));
      newEnemy.stats[0] = Math.min(newEnemy.stats[0] + 0.05, newEnemy.stats[1]);
      dispatch(allActions.enemyActions.setEnemy(newEnemy));
      return;
    }

    dispatch(allActions.gameActions.setTeam(newTeam));

    const newEnemy = JSON.parse(JSON.stringify(enemy.enemy));
    newEnemy.stats[0] -= playerDPS;
    if (newEnemy.stats[0] <= 0) {
      nextEnemy();
      return;
    }

    dispatch(allActions.enemyActions.setEnemy(newEnemy));
    dispatch(allActions.gameActions.setPlayerDPS(playerDPS));
  }

  useEffect(() => {
    gameFlowCallback.current = gameFlow;
  });

  useEffect(() => {
    if (!regions.selected) return;

    const gameSaveTick = () => {
      gameSaveCallback.current();
    }

    const gameSaveInterval = setInterval(gameSaveTick, 300000);

    const gameFlowTick = () => {
      gameFlowCallback.current();
    }

    const gameFlowInterval = setInterval(gameFlowTick, 100);

    return () => {
      clearInterval(gameSaveInterval);
      clearInterval(gameFlowInterval);
    };        
  }, [regions.selected]);

  useEffect(() => {
    if (game.alerts.length === 0) setShowAlert(false);
    if (game.alerts.length >= 1) {
      setShowAlert(true);
      setAlertMessage(game.alerts[0]);
    }
  }, [game.alerts])

  const nextEnemy = () => {
    if (enemy.enemy === undefined) return;

    if (game.enemiesLeft === 1) {
      dispatch(allActions.gameActions.setCurrentFloor(game.currentFloor + 1));
    } else {
      // level ups, enemy joining team, and evolutions
      const { newTeam, newStorage } = enemyFainted(game.team, game.storage, game.pokedex, enemy.enemy);
      dispatch(allActions.gameActions.setTeam(newTeam));
      dispatch(allActions.gameActions.setStorage(newStorage));

      // calculate currency and get the next enemy
      const newCurrency = game.currency + Math.floor(enemy.enemy.level * (enemy.enemy.stats[1] + game.currentFloor) / 50);

      dispatch(allActions.gameActions.setCurrency(newCurrency));
      dispatch(allActions.enemyActions.setEnemiesLeft(game.enemiesLeft - 1));
    }
  }

  const closeSnackbar = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setShowAlert(false);
    dispatch(allActions.gameActions.setAlerts(game.alerts.slice(1)));
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
      ></Snackbar>

      <div className={styles.column}>
        <div className={styles.row}>
          <DPS></DPS>
          <Floors></Floors>
          <div className={styles.spacer}></div>
        </div>
        <strong className={styles.enemiesLeft}>{game.enemiesLeft + " wild pokemon left."}</strong>  

        {Object.keys(enemy.enemy).length > 0 && <Enemy></Enemy>}
      </div>

    </div>
  )
}

export default Game;