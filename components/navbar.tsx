// React and Styling
import React, { useState } from 'react';
import styles from '../styles/Navbar.module.scss';

// Components
import Team from './team';
import Options from './options';
import Storage from './storage';
import Currency from './currency';
import Placeholder from './placeholder';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

interface NavbarProps {
  dps: number,
  currency: number,
  items: {},
  storage: PokemonMap[],
  team: PokemonMap[],
  badges: string[],
  artwork: string
}

const Navbar = (props: React.PropsWithChildren<NavbarProps>) => {
  const { dps, currency, items, storage, team, badges, artwork } = props;
  const [option, setOption] = useState(0);

  return (
    <nav className={styles.container}>
      <Currency currency={currency}></Currency>
      <Options selected={option} select={setOption}></Options>

      {option === 0 && <Team team={team} dps={dps} artwork={artwork}></Team>}
      {option === 1 && <Storage storage={storage} artwork={artwork}></Storage>}
      {option === 2 && <Placeholder></Placeholder>}
      {option === 3 && <Placeholder></Placeholder>}
      {option === 4 && <Placeholder></Placeholder>}
    </nav>
  )
}

export default Navbar;