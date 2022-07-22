// React and Styling
import React from 'react';
import styles from '../styles/Options.module.scss';

// MUI and MUI Icons
import { Button } from '@mui/material';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InsightsIcon from '@mui/icons-material/Insights';
import ScienceIcon from '@mui/icons-material/Science';

interface OptionsProps {
  select: Function,
  selected: number,
}

const Options = (props: React.PropsWithChildren<OptionsProps>) => {
  const { select, selected } = props;

  return (
    <div className={styles.container}>
      <Button 
        className={selected === 0 ? styles.optionSelected : styles.option} 
        variant="contained" 
        onClick={() => select(0)}>
        <CatchingPokemonIcon></CatchingPokemonIcon>
      </Button>

      <Button 
        className={selected === 1 ? styles.optionSelected : styles.option} 
        variant="contained" 
        onClick={() => select(1)}>
        <DesktopWindowsIcon></DesktopWindowsIcon>
      </Button>

      <Button 
        className={selected === 2 ? styles.optionSelected : styles.option} 
        variant="contained" 
        onClick={() => select(2)}>
        <ScienceIcon></ScienceIcon>
      </Button>

      <Button 
        className={selected === 3 ? styles.optionSelected : styles.option} 
        variant="contained" 
        onClick={() => select(3)}>        
        <ShoppingCartIcon></ShoppingCartIcon>
      </Button>

      <Button 
        className={selected === 4 ? styles.optionSelected : styles.option} 
        variant="contained" 
        onClick={() => select(4)}>
        <InsightsIcon></InsightsIcon>
      </Button>
    </div>
  )
}

export default Options;