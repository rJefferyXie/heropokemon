// React and Styling
import React from 'react';
import styles from '../styles/Biomes.module.scss';

// Constants
import BiomeTypes from '../constants/BiomeTypes';

// Animations
import { motion } from 'framer-motion';
import GrowRight from '../animations/growRight';

// Redux
import { useSelector } from 'react-redux';

const Biomes = () => {
  const biome = useSelector((state: any) => state.biomeReducer.activeBiome);

  return (
    <div className={styles.container}>
      <img className={styles.wallpaper} src={`/images/biomes/${biome}.webp`} alt={biome}></img>
      <motion.div 
        className={styles.biomeText}
        key={biome} 
        initial="hidden" 
        animate="visible" 
        transition={{duration: 0.5}}
        variants={GrowRight}
      >
        <img className={styles.biomeIcon} src={`/images/biomes/${biome}.webp`} alt={biome}></img>
        <p className={styles.biomeName}>{biome}</p>
      </motion.div>
    </div>
  )
}

export default Biomes;