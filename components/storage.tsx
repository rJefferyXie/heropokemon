// React and Styling
import React from 'react';
import styles from '../styles/Storage.module.scss';

// Components
import PokemonCard from './pokemonCard';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

interface StorageProps {
  storage: PokemonMap[],
  artwork: string
}

const Storage = (props: React.PropsWithChildren<StorageProps>) => {
  const { storage, artwork } = props;

  return (
    <div className={styles.container}>
      {storage.map((pokemon, idx) => {
        return <PokemonCard pokemon={pokemon} artwork={artwork} key={idx}></PokemonCard>
      })}
    </div>
  )
}

export default Storage;