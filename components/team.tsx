// React and Styling
import React, { useState } from 'react';
import styles from '../styles/Team.module.scss';

// Components
import PokemonCard from './pokemonCard';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

interface TeamProps {
  team: PokemonMap[],
  setTeam: Function,
  artwork: string,
}

const Team = (props: React.PropsWithChildren<TeamProps>) => {
  const { team, setTeam, artwork } = props;
  const [draggingIdx, setDraggingIdx] = useState(0);

  const handleDrop = (dropIdx: number) => {
    const teamCopy = JSON.parse(JSON.stringify(team));
    [teamCopy[dropIdx], teamCopy[draggingIdx]] = [teamCopy[draggingIdx], teamCopy[dropIdx]];
    setTeam(teamCopy);
  }

  return (
    <div className={styles.container}>
      {team.map((pokemon, idx) => {
        return <PokemonCard 
          team={team} 
          setTeam={setTeam} 
          pokemon={pokemon} 
          artwork={artwork} 
          setDragging={setDraggingIdx}
          handleDrop={handleDrop}
          index={idx} 
          key={idx}
        >
        </PokemonCard>
      })}
    </div>
  )
}

export default Team;