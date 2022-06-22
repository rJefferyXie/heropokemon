// Next
import type { NextPage } from 'next';
import Head from 'next/head';

// React and Styling
import React, { useCallback, useEffect, useState } from 'react';
import styles from '../styles/Home.module.scss';

// Components
import Regions from '../components/regions';
import Loading from '../components/loading';

// Constants
import RegionList from '../constants/RegionList';

// Database
import { db } from '../server'
import { doc, getDoc } from 'firebase/firestore'; 

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const downloadPokedexes = async () => {
      for (const region of RegionList) {
        const regionPokedex = localStorage.getItem(region);
        if (regionPokedex) continue;

        const ref = doc(db, "regions", region);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          const snapData = snapshot.data().pokedex;
          localStorage.setItem(region, JSON.stringify(snapData));
        }
      }

      setIsLoading(false);
    }

    const setDefaults = () => {
      const artwork = localStorage.getItem("artwork");
      if (!artwork) {
        localStorage.setItem("artwork", "official");
      }

      const discoveredPokemon = localStorage.getItem("discoveredPokemon");
      if (!discoveredPokemon) {
        localStorage.setItem("discoveredPokemon", JSON.stringify([
          "bulbasaur", "charmander", "squirtle",
          "chikorita", "cyndaquil", "totodile",
          "treecko", "torchic", "mudkip",
          "turtwig", "chimchar", "piplup",
          "snivy", "tepig", "oshawott",
          "chespin", "fennekin", "froakie",
          "rowlet", "litten", "popplio"
        ]));
      }

      const unlockedRegions = localStorage.getItem("unlockedRegions");
      if (!unlockedRegions) {
        localStorage.setItem("unlockedRegions", JSON.stringify(["kanto"]));
      } 
    }
    
    setDefaults();
    downloadPokedexes();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome to PokeFight</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading && <Loading></Loading>}

      <Regions></Regions>
    </div>
  )
}

export default Home;
