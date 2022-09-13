// Styling
import styles from '../styles/SwapScreen.module.scss';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

// Components
import SwapCard from './swapCard';
import PokemonPreview from './pokemonPreview';

// MUI
import { Button, ClickAwayListener } from '@mui/material';

// Animations
import { motion } from 'framer-motion';
import DropInTop from '../animations/dropInTop';

// Redux
import { useSelector } from 'react-redux';

interface SwapScreenProps {
  swappingIdx: number,
  handleSwap: Function,
  setSwapping: Function,
  setSwappingIdx: Function,
  storagePokemon?: boolean
}

const SwapScreen = (props: React.PropsWithChildren<SwapScreenProps>) => {
  const { swappingIdx, handleSwap, setSwapping, setSwappingIdx, storagePokemon } = props;
  const team: PokemonMap[] = useSelector((state: any) => {return state.teamReducer.team});
  const storage: PokemonMap[] = useSelector((state: any) => {return state.storageReducer.storage});

  const exit = () => {
    setSwapping(false);
    setSwappingIdx(-1);
  }

  return (
    <div className={styles.overlay}>
      <ClickAwayListener onClickAway={exit}>
        <motion.div 
          className={styles.wrapper}
          initial="hidden" 
          animate="visible" 
          exit="exit" 
          variants={DropInTop}  
        >
          <div className={styles.container}>
            <h2 className={styles.swapTitle1}>BEING SWAPPED</h2>
            <div className={styles.topRow}>
              <PokemonPreview pokemon={storagePokemon ? storage[swappingIdx] : team[swappingIdx]}></PokemonPreview>
              <Button className={styles.exitButton} variant="contained" onClick={exit}>CANCEL</Button>
            </div>

            <h2 className={styles.swapTitle2}>CLICK TO SWAP IN</h2>
            <div className={styles.teamRow}>
              {team.map((pokemon, idx) => {
                return (swappingIdx !== idx || storagePokemon) && 
                  <SwapCard 
                    index={idx}
                    pokemon={pokemon} 
                    handleSwap={handleSwap}
                    key={idx}>
                  </SwapCard>
              })}
            </div>
          </div>
        </motion.div>
      </ClickAwayListener>
    </div>
  );
}

export default SwapScreen;