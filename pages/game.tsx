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

  const [clickDamage, setClickDamage] = useState(0.1);
  const [floor, setFloor] = useState(0);
  const [items, setItems] = useState({});
  const [region, setRegion] = useState('');
  const [artwork, setArtwork] = useState('');
  const [storage, setStorage] = useState({});
  const [currency, setCurrency] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState<PokedexMap>({});
  const [badges, setBadges] = useState<string[]>([]);
  const [pokedex, setPokedex] = useState<PokedexMap>({});

  /* @ts-expect-error */
  const [enemy, setEnemy] = useState<PokemonMap>({});
  const [enemies, setEnemies] = useState<PokemonMap[]>([]);
  const [discoveredPokemon, setDiscoveredPokemon] = useState<string[]>([]);

  useEffect(() => {
    if (!router) return;

    const gameRegion = localStorage.getItem('selectedRegion');
    if (!gameRegion) {
      router.push('/');
      return;
    }

    const gamePokedex = localStorage.getItem(gameRegion);
    if (!gamePokedex) {
      router.push('/');
      return;
    }

    const gameArtwork = localStorage.getItem('artwork') || 'official';
    const gameTeam = localStorage.getItem(gameRegion + 'Team') || '{}';
    const gameFloor = localStorage.getItem(gameRegion + 'Floor') || '1';
    const gameItems = localStorage.getItem(gameRegion + 'Items') || '{}';
    const gameBadges = localStorage.getItem(gameRegion + 'Badges') || '[]';
    const gameStorage = localStorage.getItem(gameRegion + 'Storage') || '{}';
    const gameCurrency = localStorage.getItem(gameRegion + 'Currency') || '0';
    const pokemonDiscovered = localStorage.getItem('discoveredPokemon') || '[]';

    setRegion(gameRegion);
    setArtwork(gameArtwork);
    setTeam(JSON.parse(gameTeam));
    setItems(JSON.parse(gameItems));
    setFloor(JSON.parse(gameFloor));
    setBadges(JSON.parse(gameBadges));
    setStorage(JSON.parse(gameStorage));
    setPokedex(JSON.parse(gamePokedex));
    setCurrency(JSON.parse(gameCurrency));
    setDiscoveredPokemon(JSON.parse(pokemonDiscovered));
  }, [router]);

  useEffect(() => {
    if (pokedex === {} || floor === 0) return;

    const pokemonList = Object.keys(pokedex);
    const enemyList: PokemonMap[] = [];
    const minLevel = floor - 2;
    const maxLevel = floor + 2;

    while (enemyList.length < 1) {
      const enemyName = pokemonList[Math.floor(Math.random() * pokemonList.length)];
      const enemyInfo = pokedex[enemyName];

      // no mythical or legendary pokemon until after floor 50
      if (floor < 50) {
        if (enemyInfo.is_legendary || enemyInfo.is_mythical) {
          continue;
        }
      }

      // only pokemon that either haven't evolved yet or have evolved one stage
      if (floor < 30) {
        if (enemyInfo.evolutions.length === 0 && enemyInfo.evolves_from !== '') {
          continue;
        }
      }

      // only pokemon that haven't evolved yet or do not evolve
      if (floor < 10) {
        if (enemyInfo.evolves_from !== '') {
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

      enemyInfo.stats[0] += enemyInfo.statBoosts[0];
      enemyList.push(enemyInfo);
    }

    setIsLoading(false);
    setEnemies(enemyList);
    setEnemy(enemyList[0]);
    setDiscoveredPokemon(discovered => [...discovered, enemyList[0].name]);
  }, [pokedex, floor]);

  useEffect(() => {
    if (isLoading) return;
    if (enemies.length === 0) setFloor(f => f + 1);
  }, [enemies, isLoading]);

  // const damageEnemy = (damage: number) => {
  //   const enemyData = enemy;
  //   enemyData.stats[0] -= damage;
  //   setEnemy(enemyData);
  //   console.log(enemy.stats[0]);
  // }

  return (
    <div className={styles.container}>
      <Head>
        <title>HeroPokemon - A Pokemon-Based Idle Game</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading && <Loading></Loading>}

      <Navbar currency={currency} items={items} storage={storage} team={team} badges={badges} artwork={artwork}></Navbar>
      {Object.keys(enemy).length > 0 && 
        <Enemy enemy={enemy} clickDamage={clickDamage} artwork={artwork}></Enemy>}
    </div>
  )
}

export default Game;