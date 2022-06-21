// React and Styling
import React, { useEffect, useState } from 'react';
import styles from '../styles/Region.module.scss';

// Constants
import StarterPokemon from '../constants/StarterPokemon';
import RegionColorSchemes from '../constants/RegionColorSchemes';

// Components
import StarterCard from './starterCard';

const Starters = () => {
  const [starterPokemon, setStarterPokemon] = useState<string[]>([]);

  // useEffect(() => {
  //   setStarterPokemon(StarterPokemon[region]);
  // }, [region]);

  return (
    <div id="Starters" className={styles.container}>

    </div>
  )
}

export default Starters;