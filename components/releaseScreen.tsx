// React and Styling
import React from 'react';
import styles from '../styles/ReleaseScreen.module.scss';

// MUI
import { ClickAwayListener, Button } from '@mui/material';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

// Animations
import { motion, AnimatePresence } from 'framer-motion';
import DropInTop from '../animations/dropInTop';

// Redux
import { useSelector } from 'react-redux';

interface ReleaseScreenProps {
  releasing: PokemonMap,
  handleRelease: Function,
  setReleasing: Function,
  setReleasingIdx: Function
}

const ReleaseScreen = (props: React.PropsWithChildren<ReleaseScreenProps>) => {
  const { releasing, handleRelease, setReleasing, setReleasingIdx } = props;

  const artwork = useSelector((state: any) => {return state.settingReducer.artwork});

  const exit = () => {
    setReleasing(undefined);
    setReleasingIdx(-1);
  }

  const release = () => {
    handleRelease();
  }

  return (
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
  )
}

export default ReleaseScreen