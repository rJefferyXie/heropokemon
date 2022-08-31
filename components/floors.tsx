// Styling
import { useEffect } from 'react';
import styles from '../styles/Floors.module.scss';

// Components
import Floor from './floor';

// Constants
import biomeList from '../constants/BiomeList';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const Floors = () => {
  const dispatch = useDispatch();
  const floor = useSelector((state: any) => {return state.gameReducer});
  const biomes = useSelector((state: any) => {return state.biomeReducer.biomes});
  const currency = useSelector((state: any) => {return state.gameReducer.currency});
  const bonusPoints = useSelector((state: any) => {return state.bonusReducer.bonusPoints});

  const setFloor = (newFloor: number) => {
    if (newFloor === floor.currentFloor) return;
    dispatch(allActions.gameActions.setCurrentFloor(newFloor));
  }

  useEffect(() => {
    // Every 10th floor is the gym biome
    if (Math.floor(floor.currentFloor % 10) === 0) {
      dispatch(allActions.biomeActions.setActiveBiome("gym"));
      return;
    }

    // Every 5th floor the biome changes
    if (floor.currentFloor <= floor.highestFloor) {
      dispatch(allActions.biomeActions.setActiveBiome(biomes[Math.floor(floor.currentFloor / 5)]));
      return;
    } 

    // Give players extra bonus points and gold after every 5th and 10th floor
    if ((floor.currentFloor % 6 === 0 || floor.currentFloor % 11 === 0) && floor.currentFloor > floor.highestFloor) {
      const goldReward = Math.ceil(floor.currentFloor ** 2.5);
      const bpReward = Math.floor(floor.currentFloor ** 0.5);

      dispatch(allActions.gameActions.setCurrency(currency + goldReward));
      dispatch(allActions.bonusActions.setBonusPoints(bonusPoints + bpReward));
      dispatch(allActions.alertActions.addAlert(`For beating floor ${floor.currentFloor}, you earned ${goldReward} and ${bpReward}BP!`));
    }
    
    // Create a new biome every 5th floor
    if (Math.floor(floor.currentFloor / 5) >= biomes.length) {
      let newBiome = Object.keys(biomeList)[Math.floor(Math.random() * (Object.keys(biomeList).length - 1))];

      // Re-roll once if we have already seen this biome for more variety
      if (biomes.includes(newBiome)) {
        newBiome = Object.keys(biomeList)[Math.floor(Math.random() * (Object.keys(biomeList).length - 1))];
      }      

      dispatch(allActions.biomeActions.setBiomes([...biomes, newBiome]));
      dispatch(allActions.biomeActions.setActiveBiome(newBiome));
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
              currentFloor={true} 
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