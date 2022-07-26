// React and Styling
import React, { useState } from 'react';
import styles from '../styles/StorageCard.module.scss';

// MUI
import { ClickAwayListener, Button } from '@mui/material';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

// Animations
import { motion, AnimatePresence } from 'framer-motion';
import DropInTop from '../animations/dropInTop';
import PokemonJoin from '../animations/pokemonJoin';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

interface StorageCardProps {
  index: number,
  pokemon: PokemonMap,
  setSwapping: Function,
  setSwappingIdx: Function,
}

const StorageCard = (props: React.PropsWithChildren<StorageCardProps>) => {
  const { pokemon, index, setSwapping, setSwappingIdx } = props;
  const [releasing, setReleasing] = useState<PokemonMap>();

  const dispatch = useDispatch();
  const artwork = useSelector((state: any) => {return state.settingReducer.artwork});
  const storage: PokemonMap[] = useSelector((state: any) => {return state.storageReducer.storage});

  const swap = () => {
    setSwapping(true);
    setSwappingIdx(index);
  }

  const release = () => {
    const newStorage = JSON.parse(JSON.stringify(storage));
    newStorage.splice(index, 1);

    dispatch(allActions.storageActions.setStorage(newStorage));
    exit();
  }

  const select = () => {
    setReleasing(pokemon);
  }

  const exit = () => {
    setReleasing(undefined);
  }

  return (
    <motion.div 
      className={styles.container}
      key="modal" 
      initial="hidden" 
      animate="visible" 
      variants={PokemonJoin}
      transition={{duration: 0.2, type: "spring"}} 
      >
      <AnimatePresence>
        {releasing !== undefined &&
          <div className={styles.overlay}>
            <ClickAwayListener onClickAway={exit}>
              <motion.div className={styles.releasePreview} 
                key="modal" 
                initial="hidden" 
                animate="visible" 
                exit="exit" 
                variants={DropInTop}
                >
                <div className={styles.infoCol}>
                  <div className={styles.releaseContainer}>
                    <h3 className={styles.releaseHeader}>Are you sure you want to release this pokemon?</h3>
                    <img className={styles.releaseImage} src={releasing.sprites[artwork]} alt={releasing.name}></img>
                    <p className={styles.releaseText}>{releasing.name + ", LEVEL: " + releasing.level}</p>
                    <div className={styles.buttonContainerRow}>
                      <Button className={styles.swapButtonRow} variant="contained" onClick={exit}>CANCEL</Button>
                      <Button className={styles.releaseButtonRow} variant="contained" onClick={release}>RELEASE</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ClickAwayListener>
          </div>
        }
      </AnimatePresence>

      <img className={styles.image} src={pokemon.sprites[artwork]} alt={"An image of " + pokemon.name}></img>
      <div className={styles.pokemonInfo}>
        <strong className={styles.pokemonName}>{pokemon.name}</strong>
        <p className={styles.pokemonLevel}>{"LEVEL " + pokemon.level}</p>
      </div>
      <div className={styles.buttonContainer}>
        <Button className={styles.swapButton} variant="contained" onClick={swap}>SWAP</Button>
        <Button className={styles.releaseButton} variant="contained" onClick={select}>FREE</Button>
      </div>
    </motion.div>
  );
}

export default StorageCard;