// React and Styling
import React, { useState } from 'react';
import styles from '../styles/Storage.module.scss';

// Components
import StorageCard from './storageCard';
import SwapScreen from './swapScreen';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const Storage = () => {
  const dispatch = useDispatch();
  const team: PokemonMap[] = useSelector((state: any) => {return state.teamReducer.team});
  const storage: PokemonMap[] = useSelector((state: any) => {return state.storageReducer.storage});

  const [swappingIdx, setSwappingIdx] = useState(-1);
  const [swapping, setSwapping] = useState(false);

  const handleSwap = (swapIdx: number) => {
    const teamCopy = JSON.parse(JSON.stringify(team));
    const storageCopy = JSON.parse(JSON.stringify(storage));
    [teamCopy[swapIdx], storageCopy[swappingIdx]] = [storageCopy[swappingIdx], teamCopy[swapIdx]];
    dispatch(allActions.teamActions.setTeam(teamCopy));
    dispatch(allActions.storageActions.setStorage(storageCopy));
    setSwappingIdx(-1);
    setSwapping(false);
  }

  return (
    <div className={styles.container}>
      {storage.length === 0 && <p className={styles.emptyStorage}>Your storage is empty.</p>}

      {swapping && 
        <SwapScreen 
          handleSwap={handleSwap}
          setSwapping={setSwapping} 
          swappingIdx={swappingIdx} 
          setSwappingIdx={setSwappingIdx}
          storagePokemon={true}>
        </SwapScreen>
      }

      {storage.slice(0, 6).map((pokemon, idx) => {
        return <StorageCard 
          pokemon={pokemon} 
          index={idx} 
          setSwapping={setSwapping} 
          setSwappingIdx={setSwappingIdx} 
          key={idx}>
          </StorageCard>
      })}
    </div>
  );
}

export default Storage;