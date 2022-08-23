// React and Styling
import { useEffect } from 'react';
import styles from '../styles/Floors.module.scss';

// Components
import Floor from './floor';
import biomeList from '../constants/BiomeList';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const Floors = () => {
  const dispatch = useDispatch();
  const floor = useSelector((state: any) => {return state.gameReducer});
  const biomes = useSelector((state: any) => {return state.biomeReducer.biomes});

  const setFloor = (newFloor: number) => {
    if (newFloor === floor.currentFloor) return;
    dispatch(allActions.gameActions.setCurrentFloor(newFloor));
  }

  useEffect(() => {
    if (Math.floor(floor.currentFloor % 10) === 0) {
      dispatch(allActions.biomeActions.setActiveBiome("gym"));
      return;
    }

    if (floor.currentFloor <= floor.highestFloor) {
      dispatch(allActions.biomeActions.setActiveBiome(biomes[Math.floor(floor.currentFloor / 5)]));
    } else {
      if (Math.floor(floor.currentFloor / 5) >= biomes.length) {
        let newBiome = Object.keys(biomeList)[Math.floor(Math.random() * (Object.keys(biomeList).length - 1))];

        // re-roll once if we have already seen this biome for more variety
        if (biomes.includes(newBiome)) {
          newBiome = Object.keys(biomeList)[Math.floor(Math.random() * (Object.keys(biomeList).length - 1))];
        }

        dispatch(allActions.biomeActions.setBiomes([...biomes, newBiome]));
        dispatch(allActions.biomeActions.setActiveBiome(newBiome));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [floor.currentFloor, floor.highestFloor]);

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