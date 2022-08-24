// Styling
import styles from '../styles/DPS.module.scss';

// Redux
import { useSelector } from 'react-redux';

const DPS = () => {
  const dps = useSelector((state: any) => {return state.damageReducer.playerDPS});

  return (
    <div className={styles.container}>
      <p>DPS: {Math.round(dps * 1000) / 100}</p>
    </div>
  );
}

export default DPS;