// React and Styling
import React from 'react';
import styles from '../styles/Region.module.scss';

// Constants
import RegionImages from '../constants/RegionImages';

import ExportedImage from 'next-image-export-optimizer';

interface RegionProps {
  name: string,
  unlocked: boolean,
  styling?: {},
  images: string[],
  select: Function
}

const Region = (props: React.PropsWithChildren<RegionProps>) => {
  const { name, unlocked, styling, images, select } = props;
  return (
    <div className={unlocked ? styles.regionContainer : styles.regionContainerLocked} onClick={() => select(name)}>
      <h1 className={styles.regionName}>{name}</h1>
      <h1 className={styles.regionUnlocked}>SELECT</h1>
      <h1 className={styles.regionLocked}>LOCKED</h1>
      <ExportedImage layout="fill" objectFit="cover" alt="kanto" src={RegionImages[name]} className={styles.regionWallpaper} style={styling}></ExportedImage>
      {images.map((image, idx) => {
        return <img className={styles.regionImage} alt={image} src={RegionImages[image]} key={idx}></img>
      })}
    </div>
  )
}

export default Region;