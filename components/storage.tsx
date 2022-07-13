// React and Styling
import React from 'react';
import styles from '../styles/Storage.module.scss';

// Components
import StorageCard from './storageCard';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

// Redux
import { useSelector } from 'react-redux';

const Storage = () => {
  const storage: PokemonMap[] = useSelector((state: any) => {return state.gameReducer.storage});
  const artwork = useSelector((state: any) => {return state.settingReducer.artwork});

  return (
    <div className={styles.container}>
      {storage.map((pokemon, idx) => {
        return <StorageCard pokemon={pokemon} index={idx} setTeam={() => null} artwork={artwork} key={idx}></StorageCard>
      })}
    </div>
  )
}

export default Storage;