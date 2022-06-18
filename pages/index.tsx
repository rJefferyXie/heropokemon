// Next
import type { NextPage } from 'next';
import Head from 'next/head';

// React and Styling
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.scss';

// Database
import { db } from '../server'
import { doc, getDoc } from 'firebase/firestore'; 

// Components
import Starters from '../components/starters';
import Navbar from '../components/navbar';

const Home: NextPage = () => {
  const [pokedex, setPokedex] = useState({});

  useEffect(() => {
    const retrievePokedex = async () => {
      localStorage.setItem("region", "kanto");
      localStorage.setItem("artwork", "official");
      const regionPokedex = localStorage.getItem("kanto");
      if (regionPokedex) {
        setPokedex(JSON.parse(regionPokedex));
        return;
      }

      const ref = doc(db, "regions", "kanto");
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        const snapData = snapshot.data().pokedex;
        localStorage.setItem("kanto", JSON.stringify(snapData));
        setPokedex(snapData);
      }
    }

    retrievePokedex();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome to PokeFight</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Starters></Starters>
    </div>
  )
}

export default Home;
