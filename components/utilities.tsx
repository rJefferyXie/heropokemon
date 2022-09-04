// Next
import { useRouter } from 'next/router';

// Styling
import styles from '../styles/Utilities.module.scss';

// MUI
import { Tooltip } from '@mui/material';

// MUI Icons
import HomeIcon from '@mui/icons-material/Home';
import SaveIcon from '@mui/icons-material/Save';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import SettingsIcon from '@mui/icons-material/Settings';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const Utilities = () => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const storage = useSelector((state: any) => {return state.storageReducer.storage});
  const items = useSelector((state: any) => {return state.itemReducer.items});
  const regions = useSelector((state: any) => {return state.regionsReducer});
  const team = useSelector((state: any) => {return state.teamReducer.team});
  const biomes = useSelector((state: any) => {return state.biomeReducer});
  const bonus = useSelector((state: any) => {return state.bonusReducer});
  const game = useSelector((state: any) => {return state.gameReducer});

  const showTutorial = () => {
    dispatch(allActions.tutorialActions.setShowTutorial());
  }

  const goHome = () => {
    Router.push('/');
  }
  
  const saveGame = () => {
    localStorage.setItem(regions.selected + 'Save', JSON.stringify({
      "floor": game.highestFloor,
      "highestFloor": game.highestFloor,
      "team": team,
      "storage": storage,
      "badges": game.badges,
      "biomes": biomes.biomes,
      "currency": game.currency,
      "items": items,
      "level": bonus.level,
      "bonuses": bonus.bonuses,
      "experience": bonus.experience,
      "bonusPoints": bonus.bonusPoints,
      "gameBeaten": game.gameBeaten
    })); 
  }

  return (
    <div className={styles.container}>
      <Tooltip className={styles.tooltip} title={<h3 className={styles.iconText}>Return to home page.</h3>} arrow placement="left">
        <HomeIcon className={styles.icon} onClick={goHome}></HomeIcon>
      </Tooltip>

      <Tooltip className={styles.tooltip} title={<h3 className={styles.iconText}>Save the game.</h3>} arrow placement="left">
        <SaveIcon className={styles.icon} onClick={saveGame}></SaveIcon>
      </Tooltip>

      <Tooltip className={styles.tooltip} title={<h3 className={styles.iconText}>Open the tutorial.</h3>} arrow placement="left">
        <HelpOutlineIcon className={styles.icon} onClick={showTutorial}></HelpOutlineIcon>
      </Tooltip>

      {/* <Tooltip className={styles.tooltip} title="Change your settings." arrow placement="left">
        <SettingsIcon className={styles.icon}></SettingsIcon>
      </Tooltip> */}
    </div>
  )
}

export default Utilities;