// React and Styling
import { useState, useEffect } from 'react';
import styles from '../styles/StarterCard.module.scss';

// Interfaces 
import PokemonMap from '../interfaces/PokemonMap';

// Constants
import TypeColorSchemes from '../constants/TypeColorSchemes';

// Redux
import { useSelector } from 'react-redux';

interface StarterCardProps {
  pokemon: PokemonMap,
  select: Function,
  selected: boolean
}

const StarterCard = (props: React.PropsWithChildren<StarterCardProps>) => {
  const { pokemon, select, selected } = props;
  const [theme, setTheme] = useState('');
  const [image, setImage] = useState('');
  const artwork = useSelector((state: any) => {return state.settingReducer.artwork});

  useEffect(() => {
    if (!pokemon || !artwork) return;

    // Set background theme and pokemon image.
    const pokemonType = pokemon.types[0];
    setTheme(TypeColorSchemes[pokemonType]);

    const pokemonImage = pokemon.sprites[artwork];
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
      <img className={styles.cardImage} src={image} alt={`An image of " + ${pokemon.name}`} draggable={false}></img>
      <p className={styles.cardName}>{pokemon.name}</p>
    </div>
  );
}

export default StarterCard;