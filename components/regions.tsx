// React and Styling
import React, { useEffect, useState } from 'react';
import styles from '../styles/Regions.module.scss';

// Components
import RegionPreview from './regionPreview';
import Region from './region';

interface RegionsProps {
  unlockedRegions: string[]
}

const Regions = (props: React.PropsWithChildren<RegionsProps>) => {
  const { unlockedRegions } = props;
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
    }

    retrievePokedex();
  }, [selectedRegion]);

  return (
    <div className={styles.container}>
      {selectedRegion !== "" && 
        <RegionPreview 
          region={selectedRegion} 
          pokedex={selectedPokedex}
          exit={() => setSelectedRegion('')}
          unlocked={unlockedRegions.includes(selectedRegion)}>
        </RegionPreview>
      }

      <Region 
        name="kanto"
        unlocked={unlockedRegions.includes("kanto")} 
        styling={{objectPosition: "left"}}
        images={["venusaur", "charizard", "blastoise", "articuno", "zapdos", "moltres"]}
        select={(region: string) => changeRegion(region)}>
      </Region>

      <Region 
        name="johto" 
        unlocked={unlockedRegions.includes("johto")} 
        styling={{}}
        images={["meganium", "typhlosion", "feraligatr", "ho-oh", "lugia", "celibi"]}
        select={(region: string) => changeRegion(region)}>
      </Region>

      <Region 
        name="hoenn"
        unlocked={unlockedRegions.includes("hoenn")} 
        styling={{}}
        images={["sceptile", "blaziken", "swampert", "groudon", "kyogre", "rayquaza"]}
        select={(region: string) => changeRegion(region)}>
      </Region>

      <Region 
        name="sinnoh" 
        unlocked={unlockedRegions.includes("sinnoh")} 
        styling={{objectPosition: "right"}}
        images={["torterra", "infernape", "empoleon", "dialga", "palkia", "giratina"]}
        select={(region: string) => changeRegion(region)}>
      </Region>

      <Region 
        name="unova"
        unlocked={unlockedRegions.includes("unova")} 
        styling={{}}
        images={["serperior", "emboar", "samurott", "reshiram", "zekrom", "kyurem"]}
        select={(region: string) => changeRegion(region)}>
      </Region>

      <Region 
        name="kalos"
        unlocked={unlockedRegions.includes("kalos")} 
        styling={{}}
        images={["chesnaught", "delphox", "greninja", "xerneas", "yveltal", "zygarde"]}
        select={(region: string) => changeRegion(region)}>
      </Region>

      <Region 
        name="alola"
        unlocked={unlockedRegions.includes("alola")} 
        styling={{}}
        images={["decidueye", "incineroar", "primarina", "lunala", "solgaleo", "necrozma"]}
        select={(region: string) => changeRegion(region)}>
      </Region>
    </div>
  )
}

export default Regions;