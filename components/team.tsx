// React and Styling
import React from 'react';
import styles from '../styles/Team.module.scss';

// Components
import PokemonCard from './pokemonCard';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

interface TeamProps {
  team: PokemonMap[],
  artwork: string,
  dps: number
}

const Team = (props: React.PropsWithChildren<TeamProps>) => {
  const { team, dps, artwork } = props;

  return (
    <div className={styles.container}>
      {team.map((pokemon, idx) => {
        return <PokemonCard pokemon={pokemon} firstSlot={idx === 0} dps={dps} artwork={artwork} key={idx}></PokemonCard>
      })}
    </div>
  )
}

export default Team;