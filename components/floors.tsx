// React and Styling
import React from 'react';
import styles from '../styles/Floors.module.scss';

// Components
import Floor from './floor';

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
            <Floor 
              setFloor={setFloor} 
              floor={floor.currentFloor - 2} 
              highestFloor={floor.highestFloor} 
              key={idx}>
            </Floor> :

            idx === 1 && floor.currentFloor > 1 ? 
            <Floor 
              setFloor={setFloor} 
              floor={floor.currentFloor - 1} 
              highestFloor={floor.highestFloor} 
              key={idx}>
            </Floor> : 

            idx === 2 ? 
            <Floor 
              setFloor={setFloor} 
              floor={floor.currentFloor} 
              highestFloor={floor.highestFloor} 
              current={true} 
              key={idx}>
            </Floor> :

            idx === 3 && floor.currentFloor < 100 ? 
            <Floor 
              setFloor={setFloor} 
              floor={floor.currentFloor + 1} 
              highestFloor={floor.highestFloor} 
              key={idx}>
            </Floor> :
            
            idx === 4 && floor.currentFloor < 99 ? 
            <Floor 
              setFloor={setFloor} 
              floor={floor.currentFloor + 2} 
              highestFloor={floor.highestFloor} 
              key={idx}>
            </Floor> : null
          }
        })
      }
    </div>
  );
}

export default Floors;