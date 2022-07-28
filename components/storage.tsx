// React and Styling
import React, { useState } from 'react';
import styles from '../styles/Storage.module.scss';

// Components
import ReleaseScreen from './releaseScreen';
import StorageCard from './storageCard';
import SwapScreen from './swapScreen';

// MUI
import { Pagination } from '@mui/material';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const Storage = () => {
  const dispatch = useDispatch();
  const team: PokemonMap[] = useSelector((state: any) => {return state.teamReducer.team});
  const storage: PokemonMap[] = useSelector((state: any) => {return state.storageReducer.storage});

  const [releasingIdx, setReleasingIdx] = useState(-1);
  const [releasing, setReleasing] = useState<PokemonMap>();
  const [swappingIdx, setSwappingIdx] = useState(-1);
  const [swapping, setSwapping] = useState(false);
  const [page, setPage] = useState(1);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSwap = (swapIdx: number) => {
    const teamCopy = JSON.parse(JSON.stringify(team));
    const storageCopy = JSON.parse(JSON.stringify(storage));
    [teamCopy[swapIdx], storageCopy[swappingIdx]] = [storageCopy[swappingIdx], teamCopy[swapIdx]];
    setSwappingIdx(-1);
    setSwapping(false);
    dispatch(allActions.teamActions.setTeam(teamCopy));
    dispatch(allActions.storageActions.setStorage(storageCopy));
  }

  const handleRelease = () => {
    const newStorage = JSON.parse(JSON.stringify(storage));
    newStorage.splice(releasingIdx, 1);

    setReleasing(undefined);
    setReleasingIdx(-1);
    dispatch(allActions.storageActions.setStorage(newStorage));
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

      {releasing &&
        <ReleaseScreen
          releasing={releasing}
          handleRelease={handleRelease}
          setReleasing={setReleasing}
          setReleasingIdx={setReleasingIdx}>
        </ReleaseScreen>
      }

      {storage.slice((page - 1) * 6, page * 6).map((pokemon, idx) => {
        return <StorageCard 
          pokemon={pokemon} 
          index={idx + (page - 1) * 6} 
          setSwapping={setSwapping} 
          setSwappingIdx={setSwappingIdx} 
          setReleasing={setReleasing}
          setReleasingIdx={setReleasingIdx}
          key={idx}>
          </StorageCard>
      })}

      <Pagination 
        className={styles.pagination} 
        count={Math.ceil(storage.length / 6)} 
        onChange={handleChange}
        siblingCount={1}
        boundaryCount={0}
        sx={{button:{color: '#ffffff', borderColor: '#ffffff'}}}
        color="primary"
        variant="outlined"         
        shape="rounded" 
      />
    </div>
  );
}

export default Storage;