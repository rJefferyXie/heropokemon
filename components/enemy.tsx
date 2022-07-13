// React and Styling
import React from 'react';
import styles from '../styles/Enemy.module.scss';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const Enemy = () => {
  const dispatch = useDispatch();
  const game = useSelector((state: any) => {return state.gameReducer});
  const enemy = useSelector((state: any) => {return state.enemyReducer});
  const artwork = useSelector((state: any) => {return state.settingReducer.artwork});

  // damage dealt to enemy upon clicking image
  const clickHit = () => {
    // if (Math.floor(game.team[0].stats[0]) <= 0) {
    //   if (!game.alerts.includes("You can't deal click damage while the first pokemon on your team has 0 HP.")) {
    //     dispatch(allActions.gameActions.setAlerts(
    //       "You can't deal click damage while the first pokemon on your team has 0 HP."
    //     ));
    //   }
      
    //   return;
    // }

    dispatch(allActions.enemyActions.hitEnemy(game.clickDamage));
  }

  return (
    <div className={styles.container}>
      <img className={styles.enemyImage} src={enemy.enemy.sprites[artwork]} alt={"An image of " + enemy.enemy.name} onClick={clickHit}></img>
      <strong className={styles.enemyName}>{enemy.enemy.name}</strong>
      <p className={styles.enemyLevel}>{"LEVEL: " + enemy.enemy.level}</p>
      <div className={styles.healthBarWrapper}>
        <div className={styles.healthBar} style={{width: Math.floor(enemy.enemy.stats[0] / enemy.enemy.stats[1] * 100) + "%"}}>
          <p className={styles.healthValue}>{Math.floor(enemy.enemy.stats[0])}/{enemy.enemy.stats[1]}</p>
        </div>
      </div>
    </div>
  )
}

export default Enemy;