// Next
import type { NextPage } from 'next';
import Head from 'next/head';

// React and Styling
import React, { useEffect } from 'react';
import styles from '../styles/Home.module.scss';

// Components
import Hero from '../components/hero';
import Regions from '../components/regions';
import Loading from '../components/loading';

// Constants
import RegionList from '../constants/RegionList';

// Database
import { db } from '../server'
import { doc, getDoc } from 'firebase/firestore'; 

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const Home: NextPage = () => {
  const dispatch = useDispatch();

  const visited = useSelector((state: any) => {return state.settingReducer.visited});
  const loading = useSelector((state: any) => {return state.loadingReducer.loading});

  const setLoading = (loading: boolean) => {
    dispatch(allActions.loadingActions.setLoading(loading));
  }

  useEffect(() => {
    const downloadPokedexes = async () => {
      for (const region of RegionList) {
        const regionPokedex = localStorage.getItem(region);
        if (regionPokedex) continue;

        console.log("downloading pokedex for " + region);

        const ref = doc(db, "regions", region);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          const snapData = snapshot.data().pokedex;
          localStorage.setItem(region, JSON.stringify(snapData));
        }
      }

      setLoading(false);
    }

    downloadPokedexes();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>HeroPokemon - A Pokemon-Based Idle Game</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading && <Loading></Loading>}

      {(!visited && !loading) && <Hero></Hero>}

      <Regions></Regions>
    </div>
  )
}

export default Home;
