// Next
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

// React and Styling
import React, { useEffect, useState } from 'react';
import styles from '../styles/Game.module.scss';

// Interfaces
import PokedexMap from '../interfaces/PokedexMap';
import PokemonMap from '../interfaces/PokemonMap';

// Components
import Loading from '../components/loading';
import Navbar from '../components/navbar';
import Enemy from '../components/enemy';

const Game: NextPage = () => {
  const router = useRouter();

  const [clickDamage, setClickDamage] = useState(10);
  const [DPS, setDPS] = useState(1);
  const [floor, setFloor] = useState(0);
  const [items, setItems] = useState({});
  const [artwork, setArtwork] = useState('');
  const [storage, setStorage] = useState({});
  const [currency, setCurrency] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState<PokedexMap>({});
  const [badges, setBadges] = useState<string[]>([]);
  const [pokedex, setPokedex] = useState<PokedexMap>({});

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
    setDiscoveredPokemon(JSON.parse(localStorage.getItem('discoveredPokemon') || '[]'));
  }, [router]);

  useEffect(() => {
    if (pokedex === {} || floor === 0) return;

    const pokemonList = Object.keys(pokedex);
    const enemyList: PokemonMap[] = [];
    const minLevel = floor - 2;
    const maxLevel = floor + 2;

    while (enemyList.length < 10) {
      const enemyName = pokemonList[Math.floor(Math.random() * pokemonList.length)];
      const enemyInfo = pokedex[enemyName];

      // no mythical or legendary pokemon until after floor 50
      if (floor < 50) {
        if (enemyInfo.is_legendary || enemyInfo.is_mythical) {
          continue;
        }
      }

      // only pokemon that have evolved once or less and have less than 100 hp
      if (floor < 30) {
        if (enemyInfo.evolutions.length === 0 && enemyInfo.evolves_from !== '') {
          continue;
        }
      }

      // only pokemon that haven't evolved and have less than 50 hp
      if (floor < 10) {
        if (enemyInfo.evolves_from !== '' || enemyInfo.stats[0] > 50) {
          continue;
        }
      }

      // randomly generate a level from range (floor - 2 to floor + 2)
      let level = Math.floor((Math.random() * (maxLevel - minLevel + 1)) + minLevel);
      level = Math.max(level, 2); // min level is 2
      level = Math.min(level, 100); // max level is 100
      enemyInfo.level = level;

      // adjust enemy stats according to level
      for (let i = 0; i < 6; i++) {
        const statBoost = Math.floor(Math.random() * level * 2);
        enemyInfo.statBoosts[i] = statBoost;
        enemyInfo.stats[i + 1] += statBoost
      }

      enemyInfo.stats[0] *= floor;
      enemyList.push(enemyInfo);
    }

    setIsLoading(false);
    setEnemies(enemyList);
    setEnemy(enemyList[0]);
    setDiscoveredPokemon(discovered => [...discovered, enemyList[0].name]);
  }, [pokedex, floor]);

  const nextEnemy = async () => {
    if (enemies.length === 0) {
      setFloor(floor + 1);
    } else {
      // randomly determine if the defeated pokemon will join our team
      const joinTeamChance = Math.floor(Math.random() * 100 + 1);
      if (joinTeamChance >= 100 && !Object.keys(team).includes(enemy.name)) {
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
      setDiscoveredPokemon(discovered => [...discovered, enemies[0].name]);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>HeroPokemon - A Pokemon-Based Idle Game</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading && <Loading></Loading>}

      <Navbar 
        currency={currency} 
        items={items} 
        storage={storage} 
        team={team} 
        badges={badges} 
        artwork={artwork}
      >
      </Navbar>

      <div className={styles.column}>
        <p style={{textShadow: "none", color: "black"}}>{"Floor: " + floor}</p>      
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