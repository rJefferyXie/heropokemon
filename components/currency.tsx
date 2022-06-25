import React from 'react';
import styles from '../styles/Currency.module.scss';

interface CurrencyProps {
  currency: number
}

const Currency = (props: React.PropsWithChildren<CurrencyProps>) => {
  const { currency } = props;

  return (
    <div className={styles.container}>
      <p>
        $<span>{currency}</span>
      </p>
    </div>
  )
}

export default Currency;