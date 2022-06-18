// React and Styling
import React, { useEffect, useState } from 'react';
import styles from '../styles/Starters.module.scss';

// Constants
import StarterPokemon from '../constants/StarterPokemon';
import RegionColorSchemes from '../constants/RegionColorSchemes';

// Components
import StarterCard from './starterCard';
import Regions from './regions';

const Starters = () => {
  const [starterPokemon, setStarterPokemon] = useState<string[]>([]);
  const [region, setRegion] = useState('kanto');

  useEffect(() => {
    setStarterPokemon(StarterPokemon[region]);
  }, [region]);

  return (
    <div id="Starters" className={styles.container}>
      <Regions setRegion={setRegion}></Regions>
      <div className={styles.innerContainer} style={{backgroundColor: RegionColorSchemes[region]}}>
        <h1 className={styles.title}>Choose a Starter!</h1>
        <div className={styles.cardContainer}>
          {starterPokemon.map((pokemon, idx) => {
            return <StarterCard name={pokemon} key={idx}></StarterCard>
          })}
        </div>
      </div>
    </div>
  )
}

export default Starters;