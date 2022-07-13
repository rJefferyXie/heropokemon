// React and Styling
import React from 'react';
import styles from '../styles/DPS.module.scss';

// Redux
import { useSelector } from 'react-redux';

const DPS = () => {
  const dps = useSelector((state: any) => {return state.gameReducer.playerDPS});

  return (
    <div className={styles.container}>
      <p>DPS: {Math.round(dps * 5 * 100) / 100}</p>
    </div>
  )
}

export default DPS;