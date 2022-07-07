// React and Styling
import React from 'react';
import styles from '../styles/Enemy.module.scss';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

interface EnemyProps {
  enemy: PokemonMap,
  setEnemy: Function,
  player: PokemonMap,
  clickDamage: number,
  artwork: string
}

const Enemy = (props: React.PropsWithChildren<EnemyProps>) => {
  const { enemy, setEnemy, player, clickDamage, artwork } = props;

  // damage dealt to enemy upon clicking image
  const clickHit = () => {
    if (Math.floor(player.stats[0]) <= 0) return;

    const newEnemy = JSON.parse(JSON.stringify(enemy));
    newEnemy.stats[0] -= clickDamage;
    setEnemy(newEnemy);
  }

  return (
    <div className={styles.container}>
      <img className={styles.enemyImage} src={enemy.sprites[artwork]} alt={"An image of " + enemy.name} onClick={clickHit}></img>
      <strong className={styles.enemyName}>{enemy.name}</strong>
      <p className={styles.enemyLevel}>{"LEVEL: " + enemy.level}</p>
      <div className={styles.healthBarWrapper}>
        <div className={styles.healthBar} style={{width: Math.floor(enemy.stats[0] / enemy.stats[1] * 100) + "%"}}>
          <p className={styles.healthValue}>{Math.floor(enemy.stats[0])}/{enemy.stats[1]}</p>
        </div>
      </div>
    </div>
  )
}

export default Enemy;