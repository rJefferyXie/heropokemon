import React from 'react';
import styles from '../styles/Starters.module.scss';

import StarterCard from './starterCard';

const Starters = () => {
  return (
    <div id="Starters" className={styles.container}>
      <StarterCard name="grass"></StarterCard>
      <StarterCard name="fire"></StarterCard>
      <StarterCard name="water"></StarterCard>
    </div>
  )
}

export default Starters;