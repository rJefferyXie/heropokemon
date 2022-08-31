// React and Styling
import { useState, useEffect } from 'react';
import styles from '../styles/TeamCard.module.scss';

// Animations
import { motion } from 'framer-motion';
import PokemonJoin from '../animations/pokemonJoin';

// MUI
import { Button } from '@mui/material';

// Game Functions
import healPokemon from '../gameFunctions/healPokemon';
import levelUp from '../gameFunctions/levelUp';

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
  const [upgradeCost, setUpgradeCost] = useState(0);

  const dispatch = useDispatch();
  const items = useSelector((state: any) => {return state.itemReducer.items});
  const currency = useSelector((state: any) => {return state.gameReducer.currency});
  const artwork = useSelector((state: any) => {return state.settingReducer.artwork});
  const pokedex = useSelector((state: any) => {return state.pokedexReducer.pokedex});
  const team: PokemonMap[] = useSelector((state: any) => {return state.teamReducer.team});

  useEffect(() => {
    setUpgradeCost(Math.floor(10 * (1.07 ** pokemon.level)));
  }, [pokemon.level]);

  const upgrade = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (upgradeCost > currency) return;
    
    const newTeam = JSON.parse(JSON.stringify(team));
    levelUp(newTeam, index, pokedex);
    dispatch(allActions.teamActions.setTeam(newTeam));
    dispatch(allActions.gameActions.setCurrency(currency - upgradeCost))
  }

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
      <div className={styles.leftCol}>
        <div className={styles.topRow}>
          <img className={styles.pokemonImage} src={pokemon.sprites[artwork]} alt={"An image of " + pokemon.name} draggable={false}></img>
          <div className={styles.pokemonInfo}>
            <strong className={styles.pokemonName}>{pokemon.name}</strong>
            <p className={styles.pokemonLevel}>{"LEVEL: " + pokemon.level}</p>
          </div>
        </div>
        <div className={styles.bottomRow}>
          {index !== 0 && <Button className={styles.swapButton} variant="contained" onClick={swap}>SWAP</Button>}
          <div className={styles.healthBarWrapper}>
            <div className={styles.healthBar} style={{width: Math.floor(pokemon.stats[0] / pokemon.stats[1] * 100) + "%"}}>
              <p className={styles.healthValue}>{Math.floor(pokemon.stats[0])}/{Math.floor(pokemon.stats[1])}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightCol}>
        <Button className={styles.levelButton} variant="contained" onClick={upgrade}>
          <div className={styles.textCol}>
            <p className={styles.levelText}>LV. UP</p>
            <p className={styles.levelCost}>{"$" + upgradeCost}</p>
          </div>
        </Button>
        <Button className={styles.healButton} variant="contained" onClick={heal}>HEAL</Button>
      </div>
    </motion.div>
  );
}

export default PokemonCard;