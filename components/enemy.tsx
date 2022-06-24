// React and Styling
import React from 'react';
import styles from '../styles/Enemy.module.scss';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

interface EnemyProps {
  enemy: PokemonMap,
  health: number,
  takeDamage: Function,
  artwork: string
}

const Enemy = (props: React.PropsWithChildren<EnemyProps>) => {
  const { enemy, health, takeDamage, artwork } = props;

  const hit = () => {
    takeDamage();
  }

  return (
    <div className={styles.container}>
      <img className={styles.enemyImage} src={enemy.sprites[artwork]} alt={"An image of " + enemy.name} onClick={hit}></img>
      <strong className={styles.enemyName}>{enemy.name}</strong>
      <p className={styles.enemyLevel}>{"LEVEL: " + enemy.level}</p>
      <div className={styles.healthBarWrapper}>
        <div className={styles.healthBar} style={{width: Math.floor(health / enemy.stats[0] * 100) + "%", backgroundColor: "red"}}>
          <p className={styles.healthValue}>{Math.floor(health)}</p>
        </div>
      </div>
    </div>
  )
}

export default Enemy;