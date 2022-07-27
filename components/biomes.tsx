// React and Styling
import React from 'react';
import styles from '../styles/Biomes.module.scss';

// Redux
import { useSelector } from 'react-redux';

const Biomes = () => {
  const biome = useSelector((state: any) => state.biomeReducer.activeBiome);

  return (
    <img className={styles.wallpaper} src={`/images/biomes/${biome}.webp`} alt="swag"></img>
  )
}

export default Biomes;