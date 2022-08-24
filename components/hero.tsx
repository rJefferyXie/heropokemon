// Next
import ExportedImage from 'next-image-export-optimizer';

// React and Styling
import { useEffect, useState } from 'react';
import styles from '../styles/Hero.module.scss';

// Constants
import RegionList from '../constants/RegionList';

// Components 
import HeroTip from './heroTip';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const Hero = () => {
  const dispatch = useDispatch();
  const artwork = useSelector((state: any) => {return state.settingReducer.artwork});

  const [clicks, setClicks] = useState(3);
  const [pokemon, setPokemon] = useState<PokemonMap>();

  useEffect(() => {
    // Randomly select any region's pokedex
    const regionIndex = Math.floor(Math.random() * RegionList.length);
    const regionString = localStorage.getItem(RegionList[regionIndex]);
    if (!regionString) return;

    // Parse through the string and randomly select a Pokemon to be displayed
    const regionJSON = JSON.parse(regionString);
    const pokemonNames = Object.keys(regionJSON);
    const pokemonIndex = Math.floor(Math.random() * pokemonNames.length);
    const pokemonDisplayed = regionJSON[pokemonNames[pokemonIndex]];
    setPokemon(pokemonDisplayed);
  }, []);

  const clickImage = () => {
    // Make player click the Pokemon three times to teach them the game
    if (clicks <= 1) {
      dispatch(allActions.settingActions.setVisited());
      return;
    }

    setClicks(clicks => clicks - 1);
  }

  return (
    pokemon !== undefined ? 
      <div className={styles.container}>
        <ExportedImage 
          className={styles.heroWallpaper} 
          layout="fill" 
          src={"images/wallpapers/hero.png"}
        >
        </ExportedImage>

        <div className={styles.mainRow}>
          <div className={styles.leftColumn}>
            <h1 className={styles.heroHeader}>HeroPokémon</h1>
            <p className={styles.heroText}>Welcome to HeroPokémon, a pokémon-themed clicker / idle game!</p>

            <HeroTip 
              content={"Features 7 different regions to explore."}
              order={1}
            >
            </HeroTip>

            <HeroTip 
              content={"Includes over 700 unique pokémon to discover."}
              order={2}
            >
            </HeroTip>

            <HeroTip 
              content={"3 artwork styles for pokémon sprites to choose from."}
              order={3}
            >
            </HeroTip>

            <p className={styles.heroFooter}>Made by Jeffery Xie</p>
          </div>

          <div className={styles.rightColumn}>
            <h1 className={styles.heroHeader}>Ready To Play?</h1>
            <img 
              className={styles.heroImage} 
              src={pokemon.sprites[artwork]} 
              alt={pokemon.name} 
              onClick={clickImage}
            >
            </img>
            <p className={styles.heroTip}>
              Click on {pokemon.name.toUpperCase()} {clicks} more time{clicks > 1 && "s"} to continue. Have fun!
            </p>
          </div>
        </div>
      </div>
    : null
  );
}

export default Hero;