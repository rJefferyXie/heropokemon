import React from 'react';
import styles from '../styles/DPS.module.scss';

interface DPSProps {
  dps: number
}

const DPS = (props: React.PropsWithChildren<DPSProps>) => {
  const { dps } = props;

  return (
    <div className={styles.container}>
      <p>DPS: {dps * 10}</p>
    </div>
  )
}

export default DPS;