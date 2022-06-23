import React from 'react';
import styles from '../styles/Region.module.scss';

import RegionImages from '../constants/RegionImages';

interface RegionProps {
  name: string,
  unlocked: boolean,
  styling?: {},
  wallpaper: string,
  images: string[],
  select: Function
}

const Region = (props: React.PropsWithChildren<RegionProps>) => {
  const { name, unlocked, styling, wallpaper, images, select } = props;
  return (
    <div className={unlocked ? styles.regionContainer : styles.regionContainerLocked} onClick={() => select(name)}>
      <h1 className={styles.regionName}>{name}</h1>
      <h1 className={styles.regionUnlocked}>SELECT</h1>
      <h1 className={styles.regionLocked}>LOCKED</h1>
      <img alt="kanto" src={RegionImages[wallpaper]} className={styles.regionWallpaper} style={styling}></img>
      {images.map((image, idx) => {
        return <img className={styles.regionImage} alt={image} src={RegionImages[image]} key={idx}></img>
      })}
    </div>
  )
}

export default Region;