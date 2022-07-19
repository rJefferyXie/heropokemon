// React and Styling
import React from 'react';
import styles from '../styles/Regions.module.scss';

// Components
import RegionPreview from './regionPreview';
import Region from './region';

// Redux
import { useSelector } from 'react-redux';

const Regions = () => {
  const selected = useSelector((state: any) => {return state.regionsReducer.selected});
  const visited = useSelector((state: any) => {return state.settingReducer.visited});

  return (
    <div className={!visited ? styles.containerHidden : styles.container}>
      {selected && <RegionPreview></RegionPreview>}

      <Region 
        name="kanto"
        images={["venusaur", "charizard", "blastoise", "articuno", "zapdos", "moltres"]}>
      </Region>

      <Region 
        name="johto" 
        images={["meganium", "typhlosion", "feraligatr", "ho-oh", "lugia", "celibi"]}>
      </Region>

      <Region 
        name="hoenn"
        images={["sceptile", "blaziken", "swampert", "groudon", "kyogre", "rayquaza"]}>
      </Region>

      <Region 
        name="sinnoh" 
        images={["torterra", "infernape", "empoleon", "dialga", "palkia", "giratina"]}>
      </Region>

      <Region 
        name="unova"
        images={["serperior", "emboar", "samurott", "reshiram", "zekrom", "kyurem"]}>
      </Region>

      <Region 
        name="kalos"
        images={["chesnaught", "delphox", "greninja", "xerneas", "yveltal", "zygarde"]}>
      </Region>

      <Region 
        name="alola"
        images={["decidueye", "incineroar", "primarina", "lunala", "solgaleo", "necrozma"]}>
      </Region>
    </div>
  );
}

export default Regions;