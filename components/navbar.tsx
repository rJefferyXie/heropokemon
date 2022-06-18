// React and Styling
import React from 'react';
import styles from '../styles/Navbar.module.scss';

// Components
import Currency from './currency';
import GameDetails from './gameDetails';

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <Currency currency={'0'}></Currency>
      <GameDetails></GameDetails>
    </nav>
  )
}

export default Navbar;