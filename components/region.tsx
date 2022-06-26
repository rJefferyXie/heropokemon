// Next
import ExportedImage from 'next-image-export-optimizer';

// React and Styling
import React from 'react';
import styles from '../styles/Region.module.scss';

// Constants
import RegionImages from '../constants/RegionImages';

interface RegionProps {
  name: string,
  unlocked: boolean,
  images: string[],
  select: Function
}

const Region = (props: React.PropsWithChildren<RegionProps>) => {
  const { name, unlocked, images, select } = props;
  return (
    <div className={unlocked ? styles.regionContainer : styles.regionContainerLocked} onClick={() => select(name)}>
      <h1 className={styles.regionName}>{name}</h1>
      <h1 className={styles.regionUnlocked}>SELECT</h1>
      <h1 className={styles.regionLocked}>LOCKED</h1>
      
      <ExportedImage 
        className={styles.regionWallpaper}
        layout="fill" 
        objectFit="cover" 
        alt={name} 
        src={RegionImages[name]} 
      >
      </ExportedImage>
      
      {images.map((image, idx) => {
        return <img className={styles.regionImage} alt={image} src={RegionImages[image]} key={idx}></img>
      })}
    </div>
  )
}

export default Region;