// React and Styling
import React, { useState } from 'react';
import styles from '../styles/Navbar.module.scss';

// Components
import Team from './team';
import Options from './options';
import Storage from './storage';
import Currency from './currency';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

interface NavbarProps {
  currency: number,
  items: {},
  storage: PokemonMap[],
  team: PokemonMap[],
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
      {option === 1 && <Storage storage={storage} artwork={artwork}></Storage>}
    </nav>
  )
}

export default Navbar;