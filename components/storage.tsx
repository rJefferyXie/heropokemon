// React and Styling
import React from 'react';
import styles from '../styles/Storage.module.scss';

// Components
import StorageCard from './storageCard';

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
        return <StorageCard pokemon={pokemon} index={idx} setTeam={() => null} artwork={artwork} key={idx}></StorageCard>
      })}
    </div>
  )
}

export default Storage;