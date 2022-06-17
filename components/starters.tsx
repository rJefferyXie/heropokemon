// React and Styling
import React, { useEffect, useState } from 'react';
import styles from '../styles/Starters.module.scss';

// Constants
import StarterPokemon from '../constants/StarterPokemon';

// Components
import StarterCard from './starterCard';

const Starters = () => {
  const [starterPokemon, setStarterPokemon] = useState<string[]>([]);

  useEffect(() => {
    const region = localStorage.getItem("region") || 'kanto';
    setStarterPokemon(StarterPokemon[region]);
  }, []);

  return (
    <div id="Starters" className={styles.container}>
      {starterPokemon.map((pokemon, idx) => {
        return <StarterCard name={pokemon} key={idx}></StarterCard>
      })}
    </div>
  )
}

export default Starters;