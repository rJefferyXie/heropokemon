import React from 'react';
import styles from '../styles/DPS.module.scss';

interface DPSProps {
  dps: number
}

const DPS = (props: React.PropsWithChildren<DPSProps>) => {
  const { dps } = props;

  return (
    <div className={styles.container}>
      <p>DPS: {Math.round(dps * 5 * 100) / 100}</p>
    </div>
  )
}

export default DPS;