// React and Styling
import React, { useState } from 'react';
import styles from '../styles/Team.module.scss';

// Components
import TeamCard from './teamCard';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const Team = () => {
  const dispatch = useDispatch();
  const team: PokemonMap[] = useSelector((state: any) => {return state.teamReducer.team});

  const [draggingIdx, setDraggingIdx] = useState(-1);

  const handleDrop = (dropIdx: number) => {
    const teamCopy = JSON.parse(JSON.stringify(team));
    [teamCopy[dropIdx], teamCopy[draggingIdx]] = [teamCopy[draggingIdx], teamCopy[dropIdx]];
    dispatch(allActions.teamActions.setTeam(teamCopy));
    setDraggingIdx(-1);
  }

  return (
    <div className={styles.container}>
      {team.map((pokemon, idx) => {
        return <TeamCard 
          pokemon={pokemon} 
          setDragging={setDraggingIdx}
          handleDrop={handleDrop}
          index={idx} 
          key={idx}
        >
        </TeamCard>
      })}
    </div>
  )
}

export default Team;