// React and Styling
import React from 'react';
import styles from '../styles/Floors.module.scss';

// MUI
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import TokenIcon from '@mui/icons-material/Token';

interface FloorsProps {
  floor: number,
  setFloor: Function,
  highestFloor: number
}

const Floors = (props: React.PropsWithChildren<FloorsProps>) => {
  const { floor, setFloor, highestFloor } = props;

  return (
    <div className={styles.container}>
      {
        [...Array(5)].map((_, idx) => {
          {
            return idx === 0 && floor > 2 ? 
            <div className={styles.floor} key={idx} onClick={() => (setFloor(floor - 2))}>
              <p>{floor - 2}</p>
              <div className={styles.iconContainer}>
                <DoneIcon></DoneIcon>
                {(floor - 2) % 10 === 0 && <TokenIcon></TokenIcon>}
              </div>
            </div> :

            idx === 1 && floor > 1 ? 
            <div className={styles.floor} key={idx} onClick={() => (setFloor(floor - 1))}>
              <p>{floor - 1}</p>
              <div className={styles.iconContainer}>
                <DoneIcon></DoneIcon>
                {(floor - 1) % 10 === 0 && <TokenIcon></TokenIcon>}
              </div>
            </div> :

            idx === 2 ? 
            <div className={styles.currentFloor} key={idx}>
              <p>{floor}</p>
              <div className={styles.iconContainer}>
                <DoneIcon></DoneIcon>
                {floor % 10 === 0 && <TokenIcon></TokenIcon>}
              </div>
            </div> :

            idx === 3 && floor < 100 ? 
            <div className={styles.floor} key={idx} onClick={floor + 1 <= highestFloor ? () => (setFloor(floor + 1)) : () => null}>
              <p>{floor + 1}</p>
              <div className={styles.iconContainer}>
                {highestFloor >= floor + 1 ? <DoneIcon></DoneIcon> : <ClearIcon></ClearIcon>}
                {(floor + 1) % 10 === 0 && <TokenIcon></TokenIcon>}
              </div>
            </div> :
            
            idx === 4 && floor < 99 ? 
            <div className={styles.floor} key={idx} onClick={floor + 2 <= highestFloor ? () => (setFloor(floor + 2)) : () => null}>
              <p>{floor + 2}</p>
              <div className={styles.iconContainer}>
                {highestFloor >= floor + 2 ? <DoneIcon></DoneIcon> : <ClearIcon></ClearIcon>}
                {(floor + 2) % 10 === 0 && <TokenIcon></TokenIcon>}
              </div>
            </div> : null
          }
        })
      }
    </div>
  )
}

export default Floors;