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
        alt={name} 
        src={"images/" + name + ".png"}
      >
      </ExportedImage>
      
      
      {unlocked && images.map((image, idx) => {
        return <div className={styles.regionImage} key={idx}>
          <ExportedImage layout="fixed" width="64px" height="64px" alt={image} src={RegionImages[image]} ></ExportedImage>
        </div>
      })}
    </div>
  )
}

export default Region;