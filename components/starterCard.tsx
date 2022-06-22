// React and Styling
import React, { useState, useEffect } from 'react';
import styles from '../styles/StarterCard.module.scss';

// Interfaces 
import PokemonMap from '../interfaces/PokemonMap';

// Constants
import TypeColorSchemes from '../constants/TypeColorSchemes';

interface StarterCardProps {
  pokemon: PokemonMap,
  select: Function,
  selected: boolean,
  artwork: string
}

const StarterCard = (props: React.PropsWithChildren<StarterCardProps>) => {
  const { pokemon, select, selected, artwork } = props;
  const [theme, setTheme] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (!pokemon || !artwork) return;

    const pokemonType = pokemon.types[0];
    const pokemonImage = pokemon.sprites[artwork];
    setTheme(TypeColorSchemes[pokemonType]);
    setImage(pokemonImage);
  }, [pokemon, artwork]);

  const selectStarter = () => {
    select(pokemon.name);
  }

  return (
    <div 
      className={selected ? styles.containerSelected : styles.container}
      style={{backgroundColor: theme}} 
      onClick={selectStarter}>
      <img className={styles.cardImage} src={image} alt={`An image of " + ${pokemon.name}`}></img>
      <p className={styles.cardName}>{pokemon.name}</p>
    </div>
  )
}

export default StarterCard;