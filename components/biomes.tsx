// React and Styling
import React from 'react';
import styles from '../styles/Biomes.module.scss';

// Constants
import BiomeTypes from '../constants/BiomeTypes';

// Redux
import { useSelector } from 'react-redux';

const Biomes = () => {
  const biome = useSelector((state: any) => state.biomeReducer.activeBiome);

  return (
    <div className={styles.container}>
      <img className={styles.wallpaper} src={`/images/biomes/${biome}.webp`} alt={biome}></img>
      <div className={styles.biomeText}>
        <img className={styles.biomeIcon} src={`/images/biomes/${biome}.webp`} alt={biome}></img>
        <p className={styles.biomeName}>{biome}</p>
      </div>
    </div>
  )
}

export default Biomes;