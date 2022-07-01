// React and Styling
import React from 'react';
import styles from '../styles/Floors.module.scss';

interface FloorsProps {
  floor: number,
  setFloor: Function
}

const Floors = (props: React.PropsWithChildren<FloorsProps>) => {
  const { floor, setFloor } = props;

  return (
    <div className={styles.container}>
      {
        [...Array(5)].map((_, idx) => {
          {
            return idx === 0 && floor > 2 ? <div className={styles.floor} key={idx} onClick={() => (setFloor(floor - 2))}>
              <p>{floor - 2}</p>
            </div> :

            idx === 1 && floor > 1 ? <div className={styles.floor} key={idx} onClick={() => (setFloor(floor - 1))}>
              <p>{floor - 1}</p>
            </div> :

            idx === 2 ? <div className={styles.currentFloor} key={idx}>
              <p>{floor}</p>
            </div> :

            idx === 3 && floor < 100 ? <div className={styles.floor} key={idx} onClick={() => (setFloor(floor + 1))}>
              <p>{floor + 1}</p>
            </div> :
            
            idx === 4 && floor < 99 ? <div className={styles.floor} key={idx} onClick={() => (setFloor(floor + 2))}>
              <p>{floor + 2}</p>
            </div> : null
          }
        })
      }
    </div>
  )
}

export default Floors;