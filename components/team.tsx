// React and Styling
import React from 'react';
import styles from '../styles/Team.module.scss';

// Components
import PokemonCard from './pokemonCard';

// Interfaces
import PokedexMap from '../interfaces/PokedexMap';

interface TeamProps {
  team: PokedexMap,
  artwork: string
}

const Team = (props: React.PropsWithChildren<TeamProps>) => {
  const { team, artwork } = props;

  return (
    <div className={styles.container}>
      {Object.keys(team).map((pokemon, idx) => {
        return <PokemonCard pokemon={team[pokemon]} artwork={artwork} key={idx}></PokemonCard>
      })}
    </div>
  )
}

export default Team;