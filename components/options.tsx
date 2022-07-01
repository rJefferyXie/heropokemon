// React and Styling
import React from 'react';
import styles from '../styles/Options.module.scss';

// MUI and MUI Icons
import { Button } from '@mui/material';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CategoryIcon from '@mui/icons-material/Category';

interface OptionsProps {
  select: Function,
  selected: number,
}

const Options = (props: React.PropsWithChildren<OptionsProps>) => {
  const { select, selected } = props;

  return (
    <div className={styles.container}>
      <Button 
        className={styles.muiButton} 
        variant="contained" 
        style={selected === 0 ? {backgroundColor: "#264E78"} : {backgroundColor: "#4C5A68"}}
        onClick={() => select(0)}>
        <CatchingPokemonIcon></CatchingPokemonIcon>
      </Button>

      <Button 
        className={styles.muiButton} 
        variant="contained" 
        style={selected === 1 ? {backgroundColor: "#264E78"} : {backgroundColor: "#4C5A68"}}
        onClick={() => select(1)}>
        <DesktopWindowsIcon></DesktopWindowsIcon>
      </Button>

      <Button 
        className={styles.muiButton} 
        variant="contained" 
        style={selected === 2 ? {backgroundColor: "#264E78"} : {backgroundColor: "#4C5A68"}}
        onClick={() => select(2)}>
        <CategoryIcon></CategoryIcon>
      </Button>

      <Button 
        className={styles.muiButton} 
        variant="contained" 
        style={selected === 3 ? {backgroundColor: "#264E78"} : {backgroundColor: "#4C5A68"}}
        onClick={() => select(3)}>        
        <ShoppingCartIcon></ShoppingCartIcon>
      </Button>

      <Button 
        className={styles.muiButton} 
        variant="contained" 
        style={selected === 4 ? {backgroundColor: "#264E78"} : {backgroundColor: "#4C5A68"}}
        onClick={() => select(4)}>
        <LeaderboardIcon></LeaderboardIcon>
      </Button>
    </div>
  )
}

export default Options;