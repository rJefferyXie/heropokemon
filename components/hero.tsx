// Next
import ExportedImage from 'next-image-export-optimizer';

// React and Styling
import React, { useEffect, useState } from 'react';
import styles from '../styles/Hero.module.scss';

// Constants
import RegionList from '../constants/RegionList';

// Components 
import HeroTip from './heroTip';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

interface HeroProps {
  artwork: string,
  proceed: Function
}

const Hero = (props: React.PropsWithChildren<HeroProps>) => {
  const { artwork, proceed } = props;
  const [pokemon, setPokemon] = useState<PokemonMap>();

  useEffect(() => {
    const regionIndex = Math.floor(Math.random() * RegionList.length);
    const regionString = localStorage.getItem(RegionList[regionIndex]);
    if (!regionString) return;

    const regionJSON = JSON.parse(regionString);
    const pokemonNames = Object.keys(regionJSON);
    const pokemonIndex = Math.floor(Math.random() * pokemonNames.length);
    const pokemonDisplayed = regionJSON[pokemonNames[pokemonIndex]];
    setPokemon(pokemonDisplayed);
  }, []);

  return (
    pokemon !== undefined ? <div className={styles.container}>
      <ExportedImage 
        className={styles.heroWallpaper} 
        layout="fill" 
        src={"images/hero.png"}
      >
      </ExportedImage>

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
          onClick={() => proceed()}
        >
        </img>
        <p className={styles.heroTip}>
          Click on {pokemon.name.toUpperCase()} to continue. Have fun!
        </p>
      </div>
    </div> : null
  );
}

export default Hero;