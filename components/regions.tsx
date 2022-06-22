// React and Styling
import React, { useEffect, useState } from 'react';
import styles from '../styles/Regions.module.scss';

// Constants
import RegionImages from '../constants/RegionImages';

// Database
import { db } from '../server'
import { doc, getDoc } from 'firebase/firestore'; 

// Components
import Region from './region';

const Regions = () => {
  const [unlockedRegions, setUnlockedRegions] = useState([""]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedPokedex, setSelectedPokedex] = useState({});

  const changeRegion = ( newRegion: string ) => {
    setSelectedRegion(newRegion);
  }

  useEffect(() => {
    if (selectedRegion === "") return;

    const retrievePokedex = async () => {
      const regionPokedex = localStorage.getItem(selectedRegion);
      if (regionPokedex) {
        setSelectedPokedex(JSON.parse(regionPokedex));
        return;
      }

      const ref = doc(db, "regions", selectedRegion);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        const snapData = snapshot.data().pokedex;
        localStorage.setItem(selectedRegion, JSON.stringify(snapData));
        setSelectedPokedex(snapData);
      }
    }

    retrievePokedex();
  }, [selectedRegion]);

  useEffect(() => {
    const unlocked = localStorage.getItem("unlockedRegions");
    if (unlocked) {
      setUnlockedRegions(JSON.parse(unlocked));
    }
  }, []);

  return (
    <div className={styles.container}>
      {selectedRegion === "" || selectedPokedex === {} ? null : 
        <Region 
          region={selectedRegion} 
          pokedex={selectedPokedex}
          exit={() => setSelectedRegion('')}
          unlocked={unlockedRegions.includes(selectedRegion)}>
        </Region>
      }

      <div className={unlockedRegions.includes("kanto") ? styles.regionContainer : styles.regionContainerLocked} onClick={() => changeRegion("kanto")}>
        <h1 className={styles.regionName}>KANTO</h1>
        <h1 className={styles.regionUnlocked}>SELECT</h1>
        <h1 className={styles.regionLocked}>LOCKED</h1>
        <img alt="kanto" src={RegionImages["kanto"]} className={styles.regionWallpaper} style={{objectPosition: "left"}}></img>
        <img alt="venusaur" src={RegionImages["venusaur"]} className={styles.regionImage}></img>
        <img alt="charizard" src={RegionImages["charizard"]} className={styles.regionImage}></img>
        <img alt="blastoise" src={RegionImages["blastoise"]} className={styles.regionImage}></img>
        <img alt="articuno" src={RegionImages["articuno"]} className={styles.regionImage}></img>
        <img alt="zapdos" src={RegionImages["zapdos"]} className={styles.regionImage}></img>
        <img alt="moltres" src={RegionImages["moltres"]} className={styles.regionImage}></img>
      </div>

      <div className={unlockedRegions.includes("johto") ? styles.regionContainer : styles.regionContainerLocked} onClick={() => changeRegion("johto")}>
        <h1 className={styles.regionName}>JOHTO</h1>
        <h1 className={styles.regionUnlocked}>SELECT</h1>
        <h1 className={styles.regionLocked}>LOCKED</h1>
        <img alt="johto" src={RegionImages["johto"]} className={styles.regionWallpaper}></img>
        <img alt="meganium" src={RegionImages["meganium"]} className={styles.regionImage}></img>
        <img alt="typhlosion" src={RegionImages["typhlosion"]} className={styles.regionImage}></img>
        <img alt="feraligatr" src={RegionImages["feraligatr"]} className={styles.regionImage}></img>
        <img alt="ho-oh" src={RegionImages["hooh"]} className={styles.regionImage}></img>
        <img alt="lugia" src={RegionImages["lugia"]} className={styles.regionImage}></img>
        <img alt="celibi" src={RegionImages["celibi"]} className={styles.regionImage}></img>
      </div>

      <div className={unlockedRegions.includes("hoenn") ? styles.regionContainer : styles.regionContainerLocked} onClick={() => changeRegion("hoenn")}>
        <h1 className={styles.regionName}>HOENN</h1>
        <h1 className={styles.regionUnlocked}>SELECT</h1>
        <h1 className={styles.regionLocked}>LOCKED</h1>
        <img alt="hoenn" src={RegionImages["hoenn"]} className={styles.regionWallpaper}></img>
        <img alt="sceptile" src={RegionImages["sceptile"]} className={styles.regionImage}></img>
        <img alt="blaziken" src={RegionImages["blaziken"]} className={styles.regionImage}></img>
        <img alt="swampert" src={RegionImages["swampert"]} className={styles.regionImage}></img>
        <img alt="groudon" src={RegionImages["groudon"]} className={styles.regionImage}></img>
        <img alt="kyogre" src={RegionImages["kyogre"]} className={styles.regionImage}></img>
        <img alt="rayquaza" src={RegionImages["rayquaza"]} className={styles.regionImage}></img>
      </div>

      <div className={unlockedRegions.includes("sinnoh") ? styles.regionContainer : styles.regionContainerLocked} onClick={() => changeRegion("sinnoh")}>
        <h1 className={styles.regionName}>SINNOH</h1>
        <h1 className={styles.regionUnlocked}>SELECT</h1>
        <h1 className={styles.regionLocked}>LOCKED</h1>
        <img alt="sinnoh" src={RegionImages["sinnoh"]} className={styles.regionWallpaper} style={{objectPosition: "right"}}></img>
        <img alt="torterra" src={RegionImages["torterra"]} className={styles.regionImage}></img>
        <img alt="infernape" src={RegionImages["infernape"]} className={styles.regionImage}></img>
        <img alt="empoleon" src={RegionImages["empoleon"]} className={styles.regionImage}></img>
        <img alt="dialga" src={RegionImages["dialga"]} className={styles.regionImage}></img>
        <img alt="palkia" src={RegionImages["palkia"]} className={styles.regionImage}></img>
        <img alt="giratina" src={RegionImages["giratina"]} className={styles.regionImage}></img>
      </div>

      <div className={unlockedRegions.includes("unova") ? styles.regionContainer : styles.regionContainerLocked} onClick={() => changeRegion("unova")}>
        <h1 className={styles.regionName}>UNOVA</h1>
        <h1 className={styles.regionUnlocked}>SELECT</h1>
        <h1 className={styles.regionLocked}>LOCKED</h1>
        <img alt="unova" src={RegionImages["unova"]} className={styles.regionWallpaper}></img>
        <img alt="serperior" src={RegionImages["serperior"]} className={styles.regionImage}></img>
        <img alt="emboar" src={RegionImages["emboar"]} className={styles.regionImage}></img>
        <img alt="samurott" src={RegionImages["samurott"]} className={styles.regionImage}></img>
        <img alt="reshiram" src={RegionImages["reshiram"]} className={styles.regionImage}></img>
        <img alt="zekrom" src={RegionImages["zekrom"]} className={styles.regionImage}></img>
        <img alt="kyurem" src={RegionImages["kyurem"]} className={styles.regionImage}></img>
      </div>

      <div className={unlockedRegions.includes("kalos") ? styles.regionContainer : styles.regionContainerLocked} onClick={() => changeRegion("kalos")}>
        <h1 className={styles.regionName}>KALOS</h1>
        <h1 className={styles.regionUnlocked}>SELECT</h1>
        <h1 className={styles.regionLocked}>LOCKED</h1>
        <img alt="kalos" src={RegionImages["kalos"]} className={styles.regionWallpaper}></img>
        <img alt="chesnaught" src={RegionImages["chesnaught"]} className={styles.regionImage}></img>
        <img alt="delphox" src={RegionImages["delphox"]} className={styles.regionImage}></img>
        <img alt="greninja" src={RegionImages["greninja"]} className={styles.regionImage}></img>
        <img alt="xerneas" src={RegionImages["xerneas"]} className={styles.regionImage}></img>
        <img alt="yveltal" src={RegionImages["yveltal"]} className={styles.regionImage}></img>
        <img alt="zygarde" src={RegionImages["zygarde"]} className={styles.regionImage}></img>
      </div>

      <div className={unlockedRegions.includes("alola") ? styles.regionContainer : styles.regionContainerLocked} onClick={() => changeRegion("alola")}>
        <h1 className={styles.regionName}>ALOLA</h1>
        <h1 className={styles.regionUnlocked}>SELECT</h1>
        <h1 className={styles.regionLocked}>LOCKED</h1>
        <img alt="alola" src={RegionImages["alola"]} className={styles.regionWallpaper}></img>
        <img alt="decidueye" src={RegionImages["decidueye"]} className={styles.regionImage}></img>
        <img alt="incineroar" src={RegionImages["incineroar"]} className={styles.regionImage}></img>
        <img alt="primarina" src={RegionImages["primarina"]} className={styles.regionImage}></img>
        <img alt="lunala" src={RegionImages["lunala"]} className={styles.regionImage}></img>
        <img alt="solgaleo" src={RegionImages["solgaleo"]} className={styles.regionImage}></img>
        <img alt="necrozma" src={RegionImages["necrozma"]} className={styles.regionImage}></img>
      </div>
    </div>
  )
}

export default Regions;