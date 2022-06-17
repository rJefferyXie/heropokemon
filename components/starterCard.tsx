// React and Styling
import React, { useState, useEffect } from 'react';
import styles from '../styles/StarterCard.module.scss';

// Constants
import TypeColorSchemes from '../constants/TypeColorSchemes';

interface StarterCardProps {
  name: string;
}

const StarterCard = (props: React.PropsWithChildren<StarterCardProps>) => {
  const { name } = props;
  const [theme, setTheme] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (!name) return;

    const pokedex = localStorage.getItem('kanto');
    const artwork = localStorage.getItem('artwork') || 'official';
    if (pokedex) {
      const pokedexMap = JSON.parse(pokedex);
      const pokemonInfo = pokedexMap[name];
      const pokemonType = pokemonInfo.types[0];
      const pokemonImage = pokemonInfo.sprites[artwork];
      setTheme(TypeColorSchemes[pokemonType]);
      setImage(pokemonImage);
    }
  }, [name]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card} style={{backgroundColor: theme}}>
        <img className={styles.cardImage} src={image} alt={`An image of " + ${name}`}></img>
        <p className={styles.cardName}>{name}</p>
      </div>
    </div>
  )
}

export default StarterCard;