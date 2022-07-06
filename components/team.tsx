// React and Styling
import React from 'react';
import styles from '../styles/Team.module.scss';

// Components
import PokemonCard from './pokemonCard';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

interface TeamProps {
  team: PokemonMap[],
  artwork: string
}

const Team = (props: React.PropsWithChildren<TeamProps>) => {
  const { team, artwork } = props;

  return (
    <div className={styles.container}>
      {team.map((pokemon, idx) => {
        return <PokemonCard pokemon={pokemon} artwork={artwork} key={idx}></PokemonCard>
      })}
    </div>
  )
}

export default Team;