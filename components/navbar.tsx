// React and Styling
import React from 'react';
import styles from '../styles/Navbar.module.scss';

// Components
import Currency from './currency';
import GameDetails from './gameDetails';
import PokemonCard from './pokemonCard';

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

  return (
    <nav className={styles.container}>
      <Currency currency={currency}></Currency>
      {Object.keys(team).map((pokemon, idx) => {
        return <PokemonCard pokemon={team[pokemon]} artwork={artwork} key={idx}></PokemonCard>
      })}
      {Object.keys(team).map((pokemon, idx) => {
        return <PokemonCard pokemon={team[pokemon]} artwork={artwork} key={idx}></PokemonCard>
      })}
            {Object.keys(team).map((pokemon, idx) => {
        return <PokemonCard pokemon={team[pokemon]} artwork={artwork} key={idx}></PokemonCard>
      })}
            {Object.keys(team).map((pokemon, idx) => {
        return <PokemonCard pokemon={team[pokemon]} artwork={artwork} key={idx}></PokemonCard>
      })}
            {Object.keys(team).map((pokemon, idx) => {
        return <PokemonCard pokemon={team[pokemon]} artwork={artwork} key={idx}></PokemonCard>
      })}
            {Object.keys(team).map((pokemon, idx) => {
        return <PokemonCard pokemon={team[pokemon]} artwork={artwork} key={idx}></PokemonCard>
      })}
      {/* <GameDetails></GameDetails> */}
    </nav>
  )
}

export default Navbar;