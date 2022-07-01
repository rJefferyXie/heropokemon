// Next
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

// React and Styling
import React, { useEffect, useState } from 'react';
import styles from '../styles/Game.module.scss';

// MUI
import { Snackbar } from '@mui/material';

// Interfaces
import PokedexMap from '../interfaces/PokedexMap';
import PokemonMap from '../interfaces/PokemonMap';

// Components
import Navbar from '../components/navbar';
import Enemy from '../components/enemy';

const Game: NextPage = () => {
  const router = useRouter();

  const [clickDamage, setClickDamage] = useState(100);
  const [DPS, setDPS] = useState(1);
  const [floor, setFloor] = useState(0);
  const [items, setItems] = useState({});
  const [artwork, setArtwork] = useState('');
  const [storage, setStorage] = useState({});
  const [currency, setCurrency] = useState(0);
  const [team, setTeam] = useState<PokedexMap>({});
  const [badges, setBadges] = useState<string[]>([]);
  const [pokedex, setPokedex] = useState<PokedexMap>({});

  const [showAlert, setShowAlert] = useState(false);
  const [alerts, setAlerts] = useState<string[]>([]);

  // @ts-expect-error
  const [enemy, setEnemy] = useState<PokemonMap>({});
  const [enemies, setEnemies] = useState<PokemonMap[]>([]);
  const [discoveredPokemon, setDiscoveredPokemon] = useState<string[]>([]);

  useEffect(() => {
    if (!router) return;

    const region = localStorage.getItem('selectedRegion');
    if (!region) {
      router.push('/');
      return;
    }

    const gamePokedex = localStorage.getItem(region);
    if (!gamePokedex) {
      router.push('/');
      return;
    } 

    const gameData = localStorage.getItem(region + 'Save') || '{}';
    if (!gameData) {
      router.push('/');
      return;
    } 

    // Set all game save related data
    const game = JSON.parse(gameData);
    setTeam(game.team);
    setItems(game.items);
    setFloor(game.floor);
    setBadges(game.badges);
    setStorage(game.storage);
    setCurrency(game.currency);

    // Set pokedex, artwork, and other settings
    setPokedex(JSON.parse(gamePokedex));
    setArtwork(localStorage.getItem('artwork') || 'official');

    // Set Discovered Pokemon
    const gameUnlocks = localStorage.getItem('gameUnlocked');
    if (gameUnlocks) setDiscoveredPokemon(JSON.parse(gameUnlocks).discoveredPokemon);
  }, [router]);

  useEffect(() => {
    if (pokedex === {} || floor === 0) return;

    const pokemonList = Object.keys(pokedex);
    const enemyList: PokemonMap[] = [];

    while (enemyList.length < 10) {
      const enemyName = pokemonList[Math.floor(Math.random() * pokemonList.length)]; 
      const pokemonEntry = pokedex[enemyName];

      // no mythical or legendary pokemon until after floor 40
      if (floor < 40) {
        if (pokemonEntry.is_legendary || pokemonEntry.is_mythical) {
          continue;
        }
      }

      // only pokemon that have evolved once or less and have less than 100 hp
      if (floor < 36) {
        if (pokemonEntry.evolutions.length === 0 && pokemonEntry.evolves_from !== '') {
          continue;
        }
      }

      // only pokemon that haven't evolved and have less than 50 hp
      if (floor < 10) {
        if (pokemonEntry.evolves_from !== '' || pokemonEntry.stats[0] > 50) {
          continue;
        }
      }

      // make a deep copy of the pokemon to avoid mutating state
      let enemyInfo = JSON.parse(JSON.stringify(pokedex[enemyName]));

      // all pokemon after and during floor 36 will be fully evolved
      if (floor >= 36) {

        // get first evolution if it exists
        if (enemyInfo.evolutions.length > 0) {
          const evolution = Math.floor(Math.random() * enemyInfo.evolutions.length);   
          enemyInfo = JSON.parse(JSON.stringify(pokedex[enemyInfo.evolutions[evolution]])); 

          // get second evolution if it exists
          if (enemyInfo.evolutions.length > 0) {
            const evolution = Math.floor(Math.random() * enemyInfo.evolutions.length);   
            enemyInfo = JSON.parse(JSON.stringify(pokedex[enemyInfo.evolutions[evolution]]));
          }
        }
      } 

      // all pokemon after and during floor 18 will have evolved once if they are able
      if (floor >= 18) {

        // get first evolution if it exists
        if (enemyInfo.evolutions.length > 0) {
          const evolution = Math.floor(Math.random() * enemyInfo.evolutions.length);   
          enemyInfo = JSON.parse(JSON.stringify(pokedex[enemyInfo.evolutions[evolution]])); 
        }
      }

      // Use the floor as the pokemon's level, ( min: 2, max: 100 )
      enemyInfo.level = Math.max(Math.min(floor, 100), 2);

      // adjust enemy stats according to level
      for (let i = 0; i < 6; i++) {
        const statBoost = Math.floor(Math.random() * floor * 2);
        enemyInfo.statBoosts[i] = statBoost;
        enemyInfo.stats[i + 1] += statBoost
      }

      enemyList.push(enemyInfo);
    }

    setEnemies(enemyList);
    setEnemy(enemyList[0]);

    if (floor === 1 && !discoveredPokemon.includes(enemyList[0].name)) {
      setDiscoveredPokemon(discovered => [...discovered, enemyList[0].name]);
      setAlerts(alerts => 
        [...alerts, 
          enemyList[0].name.toUpperCase() + 
          " added to the pokedex."
        ]
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokedex, floor]);

  const nextEnemy = async () => {
    if (enemies.length === 0) {
      setFloor(floor + 1);
    } else {

      // 3% chance for the defeated pokemon to join our team
      const joinTeamChance = Math.floor(Math.random() * 100 + 1);
      if (joinTeamChance >= 98) {
        setTeam(team => {
          team[enemy.name] = JSON.parse(JSON.stringify(enemy));
          team[enemy.name].stats[0] = team[enemy.name].stats[1];
          return team;
        });
      } 

      // all pokemon that are lower level than the enemy have a chance to level up
      Object.keys(team).map(pokemon => {
        const levelUpChance =  Math.floor(Math.random() * 100 + 1);
        if (team[pokemon].level < enemy.level && levelUpChance > 80) {          
          setTeam(team => {
            team[pokemon].level += 1;

            // level up raises pokemon stats by up to 2 points each
            for (let i = 0; i < 6; i++) {
              const statBoost = Math.floor(Math.random() * 2);
              if (i === 0) team[pokemon].stats[i] += statBoost;
              team[pokemon].statBoosts[i] += statBoost;
              team[pokemon].stats[i + 1] += statBoost;
            }

            // pokemon evolutions
            if (team[pokemon].evolutions.length > 0) {
              if (team[pokemon].evolves_from === '' && team[pokemon].level === 18
                || team[pokemon].evolves_from !== '' && team[pokemon].level === 36) {
                const evolutions = team[pokemon].evolutions;
                const evolution = Math.floor(Math.random() * evolutions.length);   
                const evolvedPokemon = JSON.parse(JSON.stringify(pokedex[evolutions[evolution]]));    
                evolvedPokemon.level = team[pokemon].level;
                evolvedPokemon.statBoosts = team[pokemon].statBoosts;
                evolvedPokemon.stats[0] += evolvedPokemon.statBoosts[0];
                evolvedPokemon.stats[0] -= team[pokemon].stats[1] - team[pokemon].stats[0];
                
                for (let i = 0; i < 6; i++) {
                  evolvedPokemon.stats[i + 1] += evolvedPokemon.statBoosts[i];
                }

                team[pokemon] = evolvedPokemon;
              }
            }

            return team;
          });
        }
      });

      // get the next enemy
      setCurrency(currency => currency + Math.floor(enemy.level * ((enemy.stats[1] + enemy.statBoosts[0]) / 50) + floor));
      setEnemies(enemies => enemies.slice(1));
      setEnemy(enemies[0]);

      if (!discoveredPokemon.includes(enemies[0].name)) {
        setDiscoveredPokemon(discovered => [...discovered, enemies[0].name]);
        setAlerts(alerts => 
          [...alerts, 
            enemies[0].name.toUpperCase() + 
            " added to the pokedex."
          ]
        );
      }
    }
  }

  useEffect(() => {
    if (alerts.length === 0) setShowAlert(false);
    if (alerts.length >= 1) setShowAlert(true);
  }, [alerts.length])

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
        <strong>{"Route " + floor}</strong>    
        <p>{enemies.length + " wild pokemon left."}</p>  
        <button onClick={() => setDPS(DPS => DPS + 1)} style={{width: "fit-content", height: "fit-content"}}>INCREASE DPS: {DPS}</button>

        {Object.keys(enemy).length > 0 && 
          <Enemy 
            enemy={enemy} 
            nextEnemy={nextEnemy} 
            clickDamage={clickDamage} 
            dps={DPS}
            artwork={artwork}
          >
          </Enemy>
        }
      </div>

    </div>
  )
}

export default Game;