// Styling
import styles from '../styles/Regions.module.scss';

// Components
import RegionPreview from './regionPreview';
import Region from './region';

// MUI
import { Button } from '@mui/material';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const Regions = () => {
  const dispatch = useDispatch();
  const visited = useSelector((state: any) => {return state.settingReducer.visited});
  const regions = useSelector((state: any) => {return state.regionsReducer.regions});
  const selected = useSelector((state: any) => {return state.regionsReducer.selected});
  
  const selectRegion = () => {
    const region = regions[Math.floor(Math.random() * (regions.length - 1))];
    dispatch(allActions.regionsActions.setRegion(region));

    const pokedex = localStorage.getItem(region);
    if (pokedex) {
      dispatch(allActions.pokedexActions.setPokedex(JSON.parse(pokedex)));
    }
  }

  return (
    <div className={!visited ? styles.containerHidden : styles.container}>
      {selected && <RegionPreview></RegionPreview>}

      <h1 className={styles.regionTitle}>Select a Region!</h1>
      <Button className={styles.playButton} variant="contained" onClick={selectRegion}>QUICK PLAY</Button>

      <div className={styles.regionContainer}>
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
    </div>
  );
}

export default Regions;