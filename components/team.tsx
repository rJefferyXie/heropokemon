// React and Styling
import React, { useState } from 'react';
import styles from '../styles/Team.module.scss';

// Components
import TeamCard from './teamCard';
import SwapScreen from './swapScreen';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const Team = () => {
  const dispatch = useDispatch();
  const team: PokemonMap[] = useSelector((state: any) => {return state.teamReducer.team});

  const [swappingIdx, setSwappingIdx] = useState(-1);
  const [swapping, setSwapping] = useState(false);

  const handleSwap = (dropIdx: number) => {
    const teamCopy = JSON.parse(JSON.stringify(team));
    [teamCopy[dropIdx], teamCopy[swappingIdx]] = [teamCopy[swappingIdx], teamCopy[dropIdx]];
    dispatch(allActions.teamActions.setTeam(teamCopy));
    setSwappingIdx(-1);
    setSwapping(false);
  }

  return (
    <div className={styles.container}>
      {swapping && 
        <SwapScreen 
          handleSwap={handleSwap}
          setSwapping={setSwapping} 
          swappingIdx={swappingIdx} 
          setSwappingIdx={setSwappingIdx}
        >
        </SwapScreen>
      }

      {team.map((pokemon, idx) => {
        return <TeamCard 
          pokemon={pokemon} 
          setSwapping={setSwapping}
          setSwappingIdx={setSwappingIdx}
          handleSwap={handleSwap}
          index={idx} 
          key={idx}
        >
        </TeamCard>
      })}
    </div>
  )
}

export default Team;