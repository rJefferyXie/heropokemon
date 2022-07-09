// React and Styling
import React, { useState } from 'react';
import styles from '../styles/Team.module.scss';

// Components
import TeamCard from './teamCard';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

interface TeamProps {
  team: PokemonMap[],
  setTeam: Function,
  artwork: string,
}

const Team = (props: React.PropsWithChildren<TeamProps>) => {
  const { team, setTeam, artwork } = props;
  const [draggingIdx, setDraggingIdx] = useState(-1);

  const handleDrop = (dropIdx: number) => {
    const teamCopy = JSON.parse(JSON.stringify(team));
    [teamCopy[dropIdx], teamCopy[draggingIdx]] = [teamCopy[draggingIdx], teamCopy[dropIdx]];
    setTeam(teamCopy);
    setDraggingIdx(-1);
  }

  return (
    <div className={styles.container}>
      {team.map((pokemon, idx) => {
        return <TeamCard 
          team={team} 
          setTeam={setTeam} 
          pokemon={pokemon} 
          artwork={artwork} 
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