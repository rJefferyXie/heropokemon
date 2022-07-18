// React and Styling
import React from 'react';
import styles from '../styles/Floors.module.scss';

// MUI
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import TokenIcon from '@mui/icons-material/Token';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const Floors = () => {
  const dispatch = useDispatch();
  const floor = useSelector((state: any) => {return state.gameReducer});

  const setFloor = (newFloor: number) => {
    if (newFloor === floor.currentFloor) return;
    dispatch(allActions.gameActions.setCurrentFloor(newFloor));
  }

  return (
    <div className={styles.container}>
      {
        [...Array(5)].map((_, idx) => {
          {
            return idx === 0 && floor.currentFloor > 2 ? 
            <div className={styles.floor} key={idx} onClick={() => (setFloor(floor.currentFloor - 2))}>
              <p>{floor.currentFloor - 2}</p>
              <div className={styles.iconContainer}>
                <DoneIcon></DoneIcon>
                {(floor.currentFloor - 2) % 10 === 0 && <TokenIcon></TokenIcon>}
              </div>
            </div> :

            idx === 1 && floor.currentFloor > 1 ? 
            <div className={styles.floor} key={idx} onClick={() => (setFloor(floor.currentFloor - 1))}>
              <p>{floor.currentFloor - 1}</p>
              <div className={styles.iconContainer}>
                <DoneIcon></DoneIcon>
                {(floor.currentFloor - 1) % 10 === 0 && <TokenIcon></TokenIcon>}
              </div>
            </div> :

            idx === 2 ? 
            <div className={styles.currentFloor} key={idx}>
              <p>{floor.currentFloor}</p>
              <div className={styles.iconContainer}>
                <DoneIcon></DoneIcon>
                {floor.currentFloor % 10 === 0 && <TokenIcon></TokenIcon>}
              </div>
            </div> :

            idx === 3 && floor.currentFloor < 100 ? 
            <div className={styles.floor} key={idx} onClick={floor.currentFloor + 1 <= floor.highestFloor ? () => (setFloor(floor.currentFloor + 1)) : () => null}>
              <p>{floor.currentFloor + 1}</p>
              <div className={styles.iconContainer}>
                {floor.highestFloor >= floor.currentFloor + 1 ? <DoneIcon></DoneIcon> : <ClearIcon></ClearIcon>}
                {(floor.currentFloor + 1) % 10 === 0 && <TokenIcon></TokenIcon>}
              </div>
            </div> :
            
            idx === 4 && floor.currentFloor < 99 ? 
            <div className={styles.floor} key={idx} onClick={floor.currentFloor + 2 <= floor.highestFloor ? () => (setFloor(floor.currentFloor + 2)) : () => null}>
              <p>{floor.currentFloor + 2}</p>
              <div className={styles.iconContainer}>
                {floor.highestFloor >= floor.currentFloor + 2 ? <DoneIcon></DoneIcon> : <ClearIcon></ClearIcon>}
                {(floor.currentFloor + 2) % 10 === 0 && <TokenIcon></TokenIcon>}
              </div>
            </div> : null
          }
        })
      }
    </div>
  )
}

export default Floors;