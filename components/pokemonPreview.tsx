// React and Styling
import React from 'react';
import styles from '../styles/PokemonPreview.module.scss';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

// Redux
import { useSelector } from 'react-redux';

interface PokemonPreviewProps {
  pokemon: PokemonMap
}

const PokemonPreview = (props: React.PropsWithChildren<PokemonPreviewProps>) => {
  const { pokemon } = props;
  const artwork = useSelector((state: any) => {return state.settingReducer.artwork});

  return (
    <div className={styles.container}>
      <img className={styles.image} src={pokemon.sprites[artwork]} alt={"An image of " + pokemon.name}></img>
      <p className={styles.text}>{pokemon.name}</p>
      <p className={styles.text}>{"LEVEL " + pokemon.level}</p>
    </div>
  )
}

export default PokemonPreview;