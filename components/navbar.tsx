// React and Styling
import React, { useState } from 'react';
import styles from '../styles/Navbar.module.scss';

// Components
import Currency from './currency';
import Team from './team';
import Options from './options';

// Interfaces
import PokedexMap from '../interfaces/PokedexMap';

interface NavbarProps {
  currency: number,
  items: {},
  storage: {},
  team: PokedexMap,
  badges: string[],
  artwork: string
}

const Navbar = (props: React.PropsWithChildren<NavbarProps>) => {
  const { currency, items, storage, team, badges, artwork } = props;
  const [option, setOption] = useState(0);

  return (
    <nav className={styles.container}>
      <Currency currency={currency}></Currency>
      <Options selected={option} select={setOption}></Options>

      {option === 0 && <Team team={team} artwork={artwork}></Team>}
    </nav>
  )
}

export default Navbar;