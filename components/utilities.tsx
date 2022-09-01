// Styling
import styles from '../styles/Utilities.module.scss';

// MUI
import { Tooltip } from '@mui/material';

// MUI Icons
import HomeIcon from '@mui/icons-material/Home';
import SaveIcon from '@mui/icons-material/Save';
import SettingsIcon from '@mui/icons-material/Settings';

const Utilities = () => {
  return (
    <div className={styles.container}>
      <Tooltip className={styles.tooltip} title="Return to home page." arrow placement="left">
        <HomeIcon className={styles.icon}></HomeIcon>
      </Tooltip>

      <Tooltip className={styles.tooltip} title="Save the game." arrow placement="left">
        <SaveIcon className={styles.icon}></SaveIcon>
      </Tooltip>

      <Tooltip className={styles.tooltip} title="Change your settings." arrow placement="left">
        <SettingsIcon className={styles.icon}></SettingsIcon>
      </Tooltip>
    </div>
  )
}

export default Utilities;