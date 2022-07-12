// React and Styling
import React, { useEffect, useState } from 'react';
import styles from '../styles/Regions.module.scss';

// Components
import RegionPreview from './regionPreview';
import Region from './region';

// Redux
import { useSelector } from 'react-redux';

const Regions = () => {
  const visited = useSelector((state: any) => {return state.settingReducer.visited});
  const regions = useSelector((state: any) => {return state.regionsReducer.regions});
  
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedPokedex, setSelectedPokedex] = useState({});

  const changeRegion = ( newRegion: string ) => {
    setSelectedRegion(newRegion);
  }

  useEffect(() => {
    if (selectedRegion === "") return;

    const retrievePokedex = () => {
      const regionPokedex = localStorage.getItem(selectedRegion);
      if (regionPokedex) setSelectedPokedex(JSON.parse(regionPokedex));
    }

    retrievePokedex();
  }, [selectedRegion]);

  return (
    <div className={!visited ? styles.containerHidden : styles.container}>
      {selectedRegion !== "" && 
        <RegionPreview 
          region={selectedRegion} 
          pokedex={selectedPokedex}
          exit={() => setSelectedRegion('')}
          unlocked={regions.includes(selectedRegion)}>
        </RegionPreview>
      }

      <Region 
        name="kanto"
        unlocked={regions.includes("kanto")} 
        images={["venusaur", "charizard", "blastoise", "articuno", "zapdos", "moltres"]}
        select={(region: string) => changeRegion(region)}>
      </Region>

      <Region 
        name="johto" 
        unlocked={regions.includes("johto")} 
        images={["meganium", "typhlosion", "feraligatr", "ho-oh", "lugia", "celibi"]}
        select={(region: string) => changeRegion(region)}>
      </Region>

      <Region 
        name="hoenn"
        unlocked={regions.includes("hoenn")} 
        images={["sceptile", "blaziken", "swampert", "groudon", "kyogre", "rayquaza"]}
        select={(region: string) => changeRegion(region)}>
      </Region>

      <Region 
        name="sinnoh" 
        unlocked={regions.includes("sinnoh")} 
        images={["torterra", "infernape", "empoleon", "dialga", "palkia", "giratina"]}
        select={(region: string) => changeRegion(region)}>
      </Region>

      <Region 
        name="unova"
        unlocked={regions.includes("unova")} 
        images={["serperior", "emboar", "samurott", "reshiram", "zekrom", "kyurem"]}
        select={(region: string) => changeRegion(region)}>
      </Region>

      <Region 
        name="kalos"
        unlocked={regions.includes("kalos")} 
        images={["chesnaught", "delphox", "greninja", "xerneas", "yveltal", "zygarde"]}
        select={(region: string) => changeRegion(region)}>
      </Region>

      <Region 
        name="alola"
        unlocked={regions.includes("alola")} 
        images={["decidueye", "incineroar", "primarina", "lunala", "solgaleo", "necrozma"]}
        select={(region: string) => changeRegion(region)}>
      </Region>
    </div>
  )
}

export default Regions;