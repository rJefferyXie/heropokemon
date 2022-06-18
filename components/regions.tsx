import React from 'react';
import styles from '../styles/Regions.module.scss';

import RegionColorSchemes from '../constants/RegionColorSchemes';

interface RegionsProps {
  setRegion: Function
}

const Regions = (props: React.PropsWithChildren<RegionsProps>) => {
  const { setRegion } = props;

  const changeRegion = ( newRegion: string ) => {
    setRegion(newRegion);
  }

  return (
    <div className={styles.container}>
      <button 
      className={styles.regionButton} 
      style={{backgroundColor: RegionColorSchemes["kanto"]}}
      onClick={() => changeRegion("kanto")}>Kanto
      </button>
      <button 
      className={styles.regionButton} 
      style={{backgroundColor: RegionColorSchemes["johto"]}}
      onClick={() => changeRegion("johto")}>Johto
      </button>
      <button 
      className={styles.regionButton} 
      style={{backgroundColor: RegionColorSchemes["hoenn"]}}
      onClick={() => changeRegion("hoenn")}>Hoenn
      </button>
      <button 
      className={styles.regionButton} 
      style={{backgroundColor: RegionColorSchemes["sinnoh"]}}
      onClick={() => changeRegion("sinnoh")}>Sinnoh
      </button>
      <button 
      className={styles.regionButton} 
      style={{backgroundColor: RegionColorSchemes["unova"]}}
      onClick={() => changeRegion("unova")}>Unova
      </button>
      <button 
      className={styles.regionButton} 
      style={{backgroundColor: RegionColorSchemes["kalos"]}}
      onClick={() => changeRegion("kalos")}>Kalos
      </button>
      <button 
      className={styles.regionButton} 
      style={{backgroundColor: RegionColorSchemes["alola"]}}
      onClick={() => changeRegion("alola")}>Alola
      </button>
    </div>
  )
}

export default Regions;