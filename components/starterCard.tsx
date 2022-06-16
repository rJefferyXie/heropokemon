import React from 'react';
import styles from '../styles/StarterCard.module.scss';

interface StarterCardProps {
  name: string;
}

const StarterCard = (props: React.PropsWithChildren<StarterCardProps>) => {
  const { name } = props;

  return (
    <div className={styles.container}>
      {name}
    </div>
  )
}

export default StarterCard;