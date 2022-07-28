// React and Styling
import React from 'react';
import styles from '../styles/Biomes.module.scss';

// Constants
import BiomeTypes from '../constants/BiomeTypes';

// Animations
import { motion } from 'framer-motion';
import FadeIn from '../animations/fadeIn';

// Redux
import { useSelector } from 'react-redux';

const Biomes = () => {
  const biome = useSelector((state: any) => state.biomeReducer.activeBiome);

  return (
    <motion.div className={styles.container}>
      <img className={styles.wallpaper} src={`/images/biomes/${biome}.webp`} alt={biome}></img>
      <motion.div 
        className={styles.biomeText}
        key={biome} 
        initial="hidden" 
        animate="visible" 
        transition={{duration: 0.2}}
        variants={FadeIn}
      >
        <img className={styles.biomeIcon} src={`/images/biomes/${biome}.webp`} alt={biome}></img>
        <p className={styles.biomeName}>{biome}</p>
      </motion.div>
    </motion.div>
  )
}

export default Biomes;