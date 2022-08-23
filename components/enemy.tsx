// React and Styling
import styles from '../styles/Enemy.module.scss';

// Constants
import TypeColorSchemes from '../constants/TypeColorSchemes';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const Enemy = () => {
  const dispatch = useDispatch();
  const alerts = useSelector((state: any) => {return state.alertReducer.alerts});
  const enemy = useSelector((state: any) => {return state.enemyReducer.enemy});
  const team = useSelector((state: any) => {return state.teamReducer.team});
  const bonus = useSelector((state: any) => {return state.bonusReducer});
  const artwork = useSelector((state: any) => {return state.settingReducer.artwork});

  // damage dealt to enemy upon clicking image
  const clickHit = () => {
    if (Math.floor(team[0].stats[0]) <= 0) {
      const alertMessage = "You can't deal click damage while the first pokemon on your team has 0 HP.";
      if (!alerts.includes(alertMessage)) {
        dispatch(allActions.alertActions.addAlert(alertMessage));
      }
      
      return;
    }

    dispatch(allActions.enemyActions.hitEnemy((bonus.bonuses["strongStyle"].level ** 2) + 1));
  }

  return (
    <div className={styles.container}>
      <img 
        className={styles.enemyImage} 
        src={enemy.sprites[artwork]} 
        alt={"An image of " + enemy.name} 
        onClick={clickHit}
        draggable={false}
      >
      </img>
      <div className={styles.types}>
        {enemy.types.map((type: string, idx: number) => {
          return <p className={styles.type} key={idx} style={{backgroundColor: TypeColorSchemes[type]}}>
            {type}
          </p>
        })}
      </div>
      <strong className={styles.enemyName}>{enemy.name + ", LEVEL " + enemy.level}</strong>
      <div className={styles.healthBarWrapper}>
        <div className={styles.healthBar} style={{width: Math.floor(enemy.stats[0] / enemy.stats[1] * 100) + "%"}}>
          <p className={styles.healthValue}>{Math.floor(enemy.stats[0])}/{Math.floor(enemy.stats[1])}</p>
        </div>
      </div>
    </div>
  )
}

export default Enemy;