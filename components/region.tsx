// Next
import ExportedImage from 'next-image-export-optimizer';

// React and Styling
import React from 'react';
import styles from '../styles/Region.module.scss';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

interface RegionProps {
  name: string,
  images: string[]
}

const Region = (props: React.PropsWithChildren<RegionProps>) => {
  const { name, images } = props;

  const dispatch = useDispatch();
  const regions = useSelector((state: any) => {return state.regionsReducer});
  
  const select = ( newRegion: string ) => {
    dispatch(allActions.regionsActions.setRegion(newRegion));

    const pokedex = localStorage.getItem(newRegion);
    if (pokedex) {
      dispatch(allActions.pokedexActions.setPokedex(JSON.parse(pokedex)));
    }
  }

  return (
    <div className={regions.regions.includes(name) ? styles.regionContainer : styles.regionContainerLocked} onClick={() => select(name)}>
      <h1 className={styles.regionName}>{name}</h1>
      <h1 className={styles.regionUnlocked}>SELECT</h1>
      <h1 className={styles.regionLocked}>LOCKED</h1>
      
      <ExportedImage 
        className={styles.regionWallpaper}
        layout="fill" 
        alt={name} 
        src={"images/wallpapers/" + name + ".png"}
        sizes={'90vw'}
      >
      </ExportedImage>
      
      {regions.regions.includes(name) && images.map((image, idx) => {
        return <div className={styles.regionImage} key={idx}>
          <ExportedImage 
            layout="fixed" 
            width="64px" 
            height="64px" 
            alt={image} 
            src={"images/pokemon/" + image + ".png"}
          >
          </ExportedImage>
        </div>
      })}
    </div>
  )
}

export default Region;