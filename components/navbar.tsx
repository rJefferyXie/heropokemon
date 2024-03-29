// React and Styling
import { useState } from 'react';
import styles from '../styles/Navbar.module.scss';

// Components
import Team from './team';
import Shop from './shop';
import Items from './items';
import Options from './options';
import Storage from './storage';
import Bonuses from './bonuses';
import Currency from './currency';

const Navbar = () => {
  const [option, setOption] = useState(0);

  return (
    <nav className={styles.container}>
      <Currency></Currency>
      <Options selected={option} select={setOption}></Options>

      {option === 0 && <Team></Team>}
      {option === 1 && <Storage></Storage>}
      {option === 2 && <Items></Items>}
      {option === 3 && <Shop></Shop>}
      {option === 4 && <Bonuses></Bonuses>}
    </nav>
  );
}

export default Navbar;