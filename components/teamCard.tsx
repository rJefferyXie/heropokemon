// React and Styling
import { useState } from 'react';
import styles from '../styles/TeamCard.module.scss';

// Animations
import { motion } from 'framer-motion';
import PokemonJoin from '../animations/pokemonJoin';

// MUI
import { Button } from '@mui/material';

// Game Functions
import healPokemon from '../gameFunctions/healPokemon';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

// Components
import PokemonInfo from './pokemonInfo';

// Constants
import TypeColorSchemes from '../constants/TypeColorSchemes';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

interface PokemonCardProps {
  index: number,
  pokemon: PokemonMap,
  setSwappingIdx: Function,
  handleSwap: Function
}

const PokemonCard = (props: React.PropsWithChildren<PokemonCardProps>) => {
  const { pokemon, setSwappingIdx, handleSwap, index } = props;
  const [showInfo, setShowInfo] = useState(false);

  const dispatch = useDispatch();
  const items = useSelector((state: any) => {return state.itemReducer.items});
  const artwork = useSelector((state: any) => {return state.settingReducer.artwork});
  const team: PokemonMap[] = useSelector((state: any) => {return state.teamReducer.team});

  const heal = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Prevent healing if pokemon is already at full health.
    if (team[index].stats[0] >= team[index].stats[1]) return;

    // Use potion to heal pokemon if applicable and update team and item data accordingly.
    const { newTeam, newItems } = healPokemon(team, items, index)
    dispatch(allActions.teamActions.setTeam(newTeam));
    dispatch(allActions.itemActions.setItems(newItems));
  }

  const swap = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSwappingIdx(0);
    handleSwap(index);
  }

  return (
    showInfo ? <PokemonInfo pokemon={pokemon} theme={TypeColorSchemes[pokemon.types[0]]} exit={() => setShowInfo(false)}></PokemonInfo> :
    <motion.div 
      className={styles.container} 
      key="modal" 
      initial="hidden" 
      animate="visible" 
      variants={PokemonJoin}
      transition={{duration: 0.2, type: "spring"}} 
      onDragStart={() => setSwappingIdx(index)}
      onDragEnter={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => handleSwap(index)}
      onClick={() => setShowInfo(true)}
      draggable
      >
      <div className={styles.topRow}>
        <img className={styles.pokemonImage} src={pokemon.sprites[artwork]} alt={"An image of " + pokemon.name} draggable={false}></img>
        <div className={styles.pokemonInfo}>
          <strong className={styles.pokemonName}>{pokemon.name}</strong>
          <p className={styles.pokemonLevel}>{"LEVEL: " + pokemon.level}</p>
        </div>
        {index !== 0 && <Button className={styles.swapButton} variant="contained" onClick={swap}>SWAP</Button>}
      </div>
      <div className={styles.bottomRow}>
        <div className={styles.healthBarWrapper}>
          <div className={styles.healthBar} style={{width: Math.floor(pokemon.stats[0] / pokemon.stats[1] * 100) + "%"}}>
            <p className={styles.healthValue}>{Math.floor(pokemon.stats[0])}/{Math.floor(pokemon.stats[1])}</p>
          </div>
        </div>
        <Button className={styles.healButton} variant="contained" onClick={heal}>HEAL</Button>
      </div>
    </motion.div>
  );
}

export default PokemonCard;