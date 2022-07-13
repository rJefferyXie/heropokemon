// React and Styling
import React from 'react';
import styles from '../styles/SwapCard.module.scss';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

// Redux
import { useSelector } from 'react-redux';

interface SwapCardProps {
  index: number,
  pokemon: PokemonMap,
  handleSwap: Function
}

const SwapCard = (props: React.PropsWithChildren<SwapCardProps>) => {
  const { index, pokemon, handleSwap } = props;
  const artwork = useSelector((state: any) => {return state.settingReducer.artwork});

  return (
    <div className={styles.container} onClick={() => handleSwap(index)}>
      <img className={styles.image} src={pokemon.sprites[artwork]} alt={"An image of " + pokemon.name}></img>
      <p className={styles.text}>{pokemon.name}</p>
      <p className={styles.text}>{"LEVEL " + pokemon.level}</p>
    </div>
  )
}

export default SwapCard;