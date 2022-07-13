// React and Styling
import React, { useState } from 'react';
import styles from '../styles/Navbar.module.scss';

// Components
import Team from './team';
import Options from './options';
import Storage from './storage';
import Currency from './currency';
import Placeholder from './placeholder';

const Navbar = () => {
  const [option, setOption] = useState(0);

  return (
    <nav className={styles.container}>
      <Currency></Currency>
      <Options selected={option} select={setOption}></Options>

      {option === 0 && <Team></Team>}
      {option === 1 && <Storage></Storage>}
      {option === 2 && <Placeholder></Placeholder>}
      {option === 3 && <Placeholder></Placeholder>}
      {option === 4 && <Placeholder></Placeholder>}
    </nav>
  )
}

export default Navbar;