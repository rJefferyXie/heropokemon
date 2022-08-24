// React and Styling
import { useState } from 'react';
import styles from '../styles/PokemonPreview.module.scss';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

// Components
import PokemonInfo from './pokemonInfo';

// Constants
import TypeColorSchemes from '../constants/TypeColorSchemes';

// Redux
import { useSelector } from 'react-redux';

interface PokemonPreviewProps {
  pokemon: PokemonMap,
  teamIdx?: number,
  itemUse?: Function
}

const PokemonPreview = (props: React.PropsWithChildren<PokemonPreviewProps>) => {
  const { pokemon, teamIdx, itemUse } = props;
  const artwork = useSelector((state: any) => {return state.settingReducer.artwork});
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => {
    // This is for the use item screen, clicking the pokemon will use an item.
    if (teamIdx !== undefined && teamIdx >= 0 && itemUse) {
      itemUse(teamIdx);
    }

    // This is for any other screen with a Pokemon card, show the Pokemon info.
    if (teamIdx === undefined) {
      setShowInfo(true);
    }
  }

  return (
    showInfo ? <PokemonInfo pokemon={pokemon} theme={TypeColorSchemes[pokemon.types[0]]} exit={() => setShowInfo(false)}></PokemonInfo> : 
    <div className={teamIdx !== undefined && teamIdx >= 0 ? styles.containerItem : styles.container} onClick={handleClick}>

      <img className={styles.image} src={pokemon.sprites[artwork]} alt={"An image of " + pokemon.name} draggable={false}></img>
      <p className={styles.text}>{pokemon.name}</p>
      {!teamIdx && teamIdx !== 0 && <p className={styles.text}>{"LEVEL " + pokemon.level}</p>}
      
      {teamIdx !== undefined && teamIdx >= 0 && <div className={styles.healthBarWrapper}>
        <div className={styles.healthBar} style={{width: Math.floor(pokemon.stats[0] / pokemon.stats[1] * 100) + "%"}}>
          <p className={styles.healthValue}>{Math.floor(pokemon.stats[0])}/{pokemon.stats[1]}</p>
        </div>
      </div>}
    </div>
  );
}

export default PokemonPreview;