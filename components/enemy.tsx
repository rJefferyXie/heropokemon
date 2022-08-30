// Styling
import { useEffect, useState } from 'react';
import styles from '../styles/Enemy.module.scss';

// Constants
import TypeColorSchemes from '../constants/TypeColorSchemes';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const Enemy = () => {
  const dispatch = useDispatch();
  const bonus = useSelector((state: any) => {return state.bonusReducer});
  const team = useSelector((state: any) => {return state.teamReducer.team});
  const enemy = useSelector((state: any) => {return state.enemyReducer.enemy});
  const alerts = useSelector((state: any) => {return state.alertReducer.alerts});
  const artwork = useSelector((state: any) => {return state.settingReducer.artwork});
  const currentFloor = useSelector((state: any) => {return state.gameReducer.currentFloor});

  const [enemyName, setEnemyName] = useState('');
  const [enemyMaxHP, setEnemyMaxHP] = useState(0);

  const clickHit = () => {
    /*
      Deal damage to enemy upon clicking image.
      If player's first Pokemon has 0 HP, display an error message.
      Else deal damage to enemy equal to player's click damage.
    */

    if (Math.floor(team[0].stats[0]) <= 0) {
      const alertMessage = "You can't deal click damage while the first pokemon on your team has 0 HP.";
      if (!alerts.includes(alertMessage)) {
        dispatch(allActions.alertActions.addAlert(alertMessage));
      }
      
      return;
    }

    dispatch(allActions.enemyActions.hitEnemy((bonus.bonuses["strongStyle"].level ** 2) + 1));
  }

  useEffect(() => {
    if (enemyName === enemy.name) return;

    let enemyHP = 10 * (enemy.level - 1 + Math.pow(1.55, (enemy.level - 1)));
    if (currentFloor % 10 === 0) enemyHP *= 10;
    if (enemy.is_legendary) enemyHP *= 25;
    if (enemy.is_mythical) enemyHP *= 20;
    
    setEnemyName(enemy.name);
    setEnemyMaxHP(enemyHP);
  }, [enemy, enemyName, currentFloor]);

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
        <div className={styles.healthBar} style={{width: Math.floor(enemy.stats[0] / enemyMaxHP * 100) + "%"}}>
          <p className={styles.healthValue}>{Math.floor(enemy.stats[0])}/{Math.floor(enemyMaxHP)}</p>
        </div>
      </div>
    </div>
  );
}

export default Enemy;