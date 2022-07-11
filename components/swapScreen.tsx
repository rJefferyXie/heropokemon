// React and Styling
import React from 'react';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

interface SwapScreenProps {
  team: PokemonMap[],
  setTeam: Function,
  artwork: string
}

const SwapScreen = (props: React.PropsWithChildren<SwapScreenProps>) => {
  const { team, setTeam, artwork } = props;

  return (
    <div>
      {team.map((pokemon, idx) => {
        return <div key={idx}>
          <img alt={pokemon.sprites[artwork]} src={pokemon.name}></img>
          <p>{pokemon.name}</p>
        </div>
      })}
    </div>
  )
}

export default SwapScreen;