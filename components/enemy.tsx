// React and Styling
import React, { useState, useEffect } from 'react';
import styles from '../styles/Enemy.module.scss';

// Interfaces
import PokemonMap from '../interfaces/PokemonMap';

interface EnemyProps {
  enemy: PokemonMap,
  dps: number,
  nextEnemy: Function,
  clickDamage: number,
  artwork: string
}

const Enemy = (props: React.PropsWithChildren<EnemyProps>) => {
  const { enemy, dps, nextEnemy, clickDamage, artwork } = props;
  const [health, setHealth] = useState(enemy.stats[0]);

  // damage dealt to enemy upon clicking image
  const clickHit = () => {
    setHealth(health - clickDamage);
  }

  // interval for dealing damage based on team's dps
  useEffect(() => {
    const dpsInterval = setInterval(() => {
      setHealth(health => health - dps);
    }, 1000); 
    
    return () => clearInterval(dpsInterval);
  }, [dps]);

  // set health to the health of the new pokemon
  useEffect(() => {
    setHealth(enemy.stats[0]);
  }, [enemy]);

  // if health reaches 0, get the next enemy in enemy list
  useEffect(() => {
    if (health <= 0) nextEnemy();
  }, [health, nextEnemy]);

  return (
    <div className={styles.container}>
      <img className={styles.enemyImage} src={enemy.sprites[artwork]} alt={"An image of " + enemy.name} onClick={clickHit}></img>
      <strong className={styles.enemyName}>{enemy.name}</strong>
      <p className={styles.enemyLevel}>{"LEVEL: " + enemy.level}</p>
      <div className={styles.healthBarWrapper}>
        <div className={styles.healthBar} style={{width: Math.floor(health / enemy.stats[0] * 100) + "%"}}>
          <p className={styles.healthValue}>{`${Math.floor(health)}/${enemy.stats[0]}`}</p>
        </div>
      </div>
    </div>
  )
}

export default Enemy;