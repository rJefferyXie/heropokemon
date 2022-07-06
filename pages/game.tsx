// Next
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

// React and Styling
import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/Game.module.scss';

// MUI
import { Snackbar } from '@mui/material';

// Interfaces
import PokedexMap from '../interfaces/PokedexMap';
import PokemonMap from '../interfaces/PokemonMap';
import GameSave from '../interfaces/GameSave';

// Constants
import TypeAdvantages from '../constants/TypeAdvantages';

// Game Functions
import getEnemy from '../gameFunctions/getEnemy';
import getGameSave from '../gameFunctions/getGameSave';
import enemyFainted from '../gameFunctions/enemyFainted';

// Components
import Navbar from '../components/navbar';
import Floors from '../components/floors';
import Enemy from '../components/enemy';
import DPS from '../components/dps';

const Game: NextPage = () => {
  const router = useRouter();

  const [clickDamage, setClickDamage] = useState(100);
  const [dps, setDPS] = useState(1);
  const [floor, setFloor] = useState(0);
  const [highestFloor, setHighestFloor] = useState(1);
  const [items, setItems] = useState({});
  const [region, setRegion] = useState('');
  const [artwork, setArtwork] = useState('');
  const [currency, setCurrency] = useState(0);
  const [team, setTeam] = useState<PokemonMap[]>([]);
  const [badges, setBadges] = useState<string[]>([]);
  const [pokedex, setPokedex] = useState<PokedexMap>({});
  const [storage, setStorage] = useState<PokemonMap[]>([]);

  const [showAlert, setShowAlert] = useState(false);
  const [alerts, setAlerts] = useState<string[]>([]);

  const [enemy, setEnemy] = useState<PokemonMap>();
  const [enemiesLeft, setEnemiesLeft] = useState(10);
  const [discoveredPokemon, setDiscoveredPokemon] = useState<string[]>([]);

  const gameSaveCallback = useRef<any>();
  const gameFlowCallback = useRef<any>();

  useEffect(() => {
    if (!router) return;

    const game: GameSave | false = getGameSave();
    if (game === false) {
      router.push("/");
      return;
    } 
    
    setTeam(game.team);
    setItems(game.items);
    setFloor(game.floor);
    setBadges(game.badges);
    setPokedex(game.pokedex);
    setStorage(game.storage);
    setCurrency(game.currency);
    setHighestFloor(game.floor);
    setDiscoveredPokemon(JSON.parse(localStorage.getItem("discoveredPokemon") || '[]'));
    setRegion(localStorage.getItem("selectedRegion") || "kanto");
    setArtwork(localStorage.getItem('artwork') || 'official');
  }, [router]);

  useEffect(() => {
    if (pokedex === {} || floor === 0) return;

    const enemyInfo = getEnemy(pokedex, floor);
    setEnemy(enemyInfo);

    const enemyName = enemyInfo.name;
    if (!discoveredPokemon.includes(enemyName)) {
      setDiscoveredPokemon(discovered => [...discovered, enemyName]);
      setAlerts(alerts => [...alerts, enemyName.toUpperCase() + " added to the pokedex."]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokedex, enemiesLeft]);

  useEffect(() => {
    setEnemiesLeft(10);
    setHighestFloor(highestFloor => Math.max(floor, highestFloor));
  }, [floor]);

  const saveGame = () => {
    localStorage.setItem(region + 'Save', JSON.stringify({
      "floor": highestFloor,
      "currency": currency,
      "team": team,
      "storage": storage,
      "items": items,
      "badges": badges,
      "pokedex": pokedex
    }));
  
    localStorage.setItem("discoveredPokemon", JSON.stringify(discoveredPokemon));
  }

  useEffect(() => {
    gameSaveCallback.current = saveGame;
  });

  const getDPS = () => {
    if (enemy === undefined || team.length === 0) return;

    let totalDPS = 0;
    const enemyHP = enemy.stats[0] * 0.05;
    const pokemon = team[0];
        
    // attack --> defense
    pokemon.stats[2] - enemy.stats[3] > 0 ? totalDPS += enemyHP : totalDPS -= enemyHP;

    // sp.atk --> sp.def
    pokemon.stats[4] - enemy.stats[5] > 0 ? totalDPS += enemyHP : totalDPS -= enemyHP;

    // speed --> speed
    pokemon.stats[6] - enemy.stats[6] > 0 ? totalDPS += enemyHP : totalDPS -= enemyHP;

    // calculate multipliers from type advantages or disadvantages
    for (let i = 0; i < pokemon.types.length; i++) {
      const typeAdvantages = TypeAdvantages[pokemon.types[i]];
      for (let j = 0; j < enemy.types.length; j++) {
        if (typeAdvantages.strong.includes(enemy.types[j])) totalDPS += Math.abs(totalDPS) * 2;
        if (typeAdvantages.weak.includes(enemy.types[j])) totalDPS -= Math.abs(totalDPS) / 2;
        if (typeAdvantages.resist.includes(enemy.types[j])) totalDPS *= 0;          
      }
    }

    totalDPS += totalDPS;
  
    setDPS(Math.max(totalDPS, enemyHP) / 10);
  }

  useEffect(() => {
    gameFlowCallback.current = getDPS;
  });

  useEffect(() => {
    if (!region) return;

    // const gameSaveTick = () => {
    //   gameSaveCallback.current();
    // }

    // const gameSaveInterval = setInterval(gameSaveTick, 30000);

    const gameFlowTick = () => {
      gameFlowCallback.current();
    }

    const gameFlowInterval = setInterval(gameFlowTick, 100);

    return () => {
      // clearInterval(gameSaveInterval);
      clearInterval(gameFlowInterval);
    };        
  }, [region]);

  useEffect(() => {
    if (alerts.length === 0) setShowAlert(false);
    if (alerts.length >= 1) setShowAlert(true);
  }, [alerts.length])

  const nextEnemy = () => {
    if (enemy === undefined) return;

    if (enemiesLeft === 1) {
      setFloor(floor + 1);
    } else {
      // level ups, enemy joining team, and evolutions
      const { newTeam, newStorage } = enemyFainted(team, storage, pokedex, enemy);
      setTeam(newTeam);
      setStorage(newStorage);

      // calculate currency and get the next enemy
      setCurrency(currency => currency + Math.floor(enemy.level * ((enemy.stats[1] + enemy.statBoosts[0]) / 50) + floor));
      setEnemiesLeft(enemiesLeft => enemiesLeft - 1);
    }
  }

  const closeSnackbar = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setShowAlert(false);
    setAlerts(alerts => alerts.slice(1));
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>HeroPokemon - A Pokemon-Based Idle Game</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar 
        currency={currency} 
        items={items} 
        storage={storage} 
        team={team} 
        badges={badges} 
        artwork={artwork}
      >
      </Navbar>

      <Snackbar 
        open={showAlert}
        message={alerts[0]}
        autoHideDuration={2000}
        onClose={closeSnackbar}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      ></Snackbar>

      <div className={styles.column}>
        <div className={styles.row}>
          <DPS dps={dps}></DPS>
          <Floors floor={floor} setFloor={setFloor} highestFloor={highestFloor}></Floors>
          <div className={styles.spacer}></div>
        </div>
        <strong className={styles.enemiesLeft}>{enemiesLeft + " wild pokemon left."}</strong>  

        {enemy !== undefined && 
          <Enemy 
            enemy={enemy} 
            nextEnemy={nextEnemy} 
            clickDamage={clickDamage} 
            dps={dps}
            artwork={artwork}
          >
          </Enemy>
        }
      </div>

    </div>
  )
}

export default Game;