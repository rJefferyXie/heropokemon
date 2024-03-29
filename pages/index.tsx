// Next
import type { NextPage } from 'next';
import Head from 'next/head';

// React and Styling
import { useEffect } from 'react';
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

  useEffect(() => {
    const setLoading = (loading: boolean) => {
      dispatch(allActions.loadingActions.setLoading(loading));
    }

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

      setLoading(false);
    }

    downloadPokedexes();
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Head>
        <title>HeroPokemon - A Pokemon-Themed Idle Game</title>
        <meta name="description" content="HeroPokemon - A pokemon-themed idle / incremental game." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading && <Loading></Loading>}

      {(!visited && !loading) && <Hero></Hero>}

      <Regions></Regions>
    </div>
  )
}

export default Home;
