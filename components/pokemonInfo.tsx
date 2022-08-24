// React and Styling
import styles from '../styles/PokemonInfo.module.scss';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';
import PokedexMap from '../interfaces/PokedexMap';

// Constants
import StatMap from '../constants/StatMap';
import TypeColorSchemes from '../constants/TypeColorSchemes';

// MUI
import { Button, ClickAwayListener } from '@mui/material';

// Redux
import { useSelector } from 'react-redux';

interface PokemonInfoProps {
  pokemon: PokemonMap,
  theme: string,
  exit: Function
}

const PokemonInfo = (props: React.PropsWithChildren<PokemonInfoProps>) => {
  const { pokemon, theme, exit } = props;
  const artwork = useSelector((state: any) => {return state.settingReducer.artwork});
  const pokedex: PokedexMap = useSelector((state: any) => {return state.pokedexReducer.pokedex});

  return (
    <ClickAwayListener onClickAway={() => exit()}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.infoCol}>
            <div className={styles.info}>
              <p className={styles.name}>{pokemon.name}</p>
              <p className={styles.level}>{"LEVEL " + pokemon.level}</p>
              <p>{"HEIGHT " + pokemon.height * 10 + "cm (" + (pokemon.height / 2.54 / 12).toFixed(1) + "ft. "  + (pokemon.height / 2.54 % 12).toFixed(1) + 'in.)'}</p>
              <p>{"WEIGHT " + pokemon.weight / 10 + "kg (" + (pokemon.weight / 4.536).toFixed(1) + "lbs)"}</p>
              <div className={styles.types}>
                {pokemon.types.map((type, idx) => {
                  return (
                    <p className={styles.type} key={idx} style={{backgroundColor: TypeColorSchemes[type]}}>
                      {type}
                    </p>
                  )
                })}
              </div>
            </div>
          </div>

          <img className={styles.image} src={pokemon.sprites[artwork]} alt={pokemon.name} draggable={false}></img>

          <div className={styles.infoCol}>
            <div className={styles.stats}>
              {pokemon.stats.slice(1).map((stat, idx) => {
                return (
                  <div className={styles.stat} key={idx}>
                    <p className={styles.statName}>{StatMap[idx]}</p>
                    <div className={styles.statBarWrapper}>
                      <div 
                        className={styles.statBar} 
                        style={
                          idx === 0 ? 
                          {width: pokemon.stats[0] / stat * 100 + "%", backgroundColor: theme } : 
                          {width: stat / 2 + "%", backgroundColor: theme}
                        }>
                        <p className={styles.statValue}>{idx === 0 ? Math.floor(pokemon.stats[0]) + "/" + stat : stat}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          {!pokemon.evolves_from ? 
            <div className={styles.evoContainer}>
              <p>Evolves From: None</p>
            </div> : 
            <div className={styles.evoContainer}>
              <p>{"Evolves From: " + pokemon.evolves_from.toUpperCase()}</p>
              <img className={styles.evoImage} src={pokedex[pokemon.evolves_from].sprites[artwork]} alt={pokemon.evolves_from}></img>
            </div>
          }

          <Button className={styles.exitButton} variant="contained" onClick={() => exit()}>EXIT</Button>

          {!pokemon.evolutions ? 
            <div className={styles.evoContainer}>
              <p>Evolutions: None</p>
            </div> : 
            <div className={styles.evoContainer}>
              <p>Evolutions: </p>
              {pokemon.evolutions.map((evolution: string) => {
                return (
                  <div className={styles.evolution} key={evolution}>
                    <p>{evolution.toUpperCase()}</p>
                    <img className={styles.evoImage} src={pokedex[evolution].sprites[artwork]} alt={evolution}></img>
                  </div>
                )}
              )}
            </div>
          }
        </div>
      </div>
    </ClickAwayListener>
  );
}

export default PokemonInfo;