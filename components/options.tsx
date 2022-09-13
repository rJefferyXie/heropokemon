// Styling
import styles from '../styles/Options.module.scss';

// Components
import OptionButton from './optionButton';

// MUI Icons
import ScienceIcon from '@mui/icons-material/Science';
import InsightsIcon from '@mui/icons-material/Insights';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

interface OptionsProps {
  select: Function,
  selected: number,
}

const Options = (props: React.PropsWithChildren<OptionsProps>) => {
  const { select, selected } = props;

  const icons = [
    <CatchingPokemonIcon key={"TeamIcon"}></CatchingPokemonIcon>,
    <DesktopWindowsIcon key={"StorageIcon"}></DesktopWindowsIcon>,
    <ScienceIcon key={"ItemsIcon"}></ScienceIcon>,
    <ShoppingCartIcon key={"ShopIcon"}></ShoppingCartIcon>,
    <InsightsIcon key={"AbilitiesIcon"}></InsightsIcon>
  ]

  return (
    <div className={styles.container}>
      {[...Array(5)].map((_, i) => {
        return (
          <OptionButton 
            key={i}
            className={selected === i ? styles.optionSelected : styles.option}
            select={() => select(i)}
            icon={icons[i]}
          >
          </OptionButton>
        )}
      )}
    </div>
  );
}

export default Options;