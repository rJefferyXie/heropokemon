// React and Styling
import React from 'react';
import styles from '../styles/Storage.module.scss';

// Components
import PokemonCard from './pokemonCard';

// Interfaces
import PokedexMap from '../interfaces/PokedexMap';

interface StorageProps {
  storage: PokedexMap,
  artwork: string
}

const Storage = (props: React.PropsWithChildren<StorageProps>) => {
  const { storage, artwork } = props;

  return (
    <div className={styles.container}>
      {Object.keys(storage).map((pokemon, idx) => {
        return <PokemonCard pokemon={storage[pokemon]} artwork={artwork} key={idx}></PokemonCard>
      })}
    </div>
  )
}

export default Storage;