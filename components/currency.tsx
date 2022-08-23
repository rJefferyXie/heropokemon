// React and Styling
import styles from '../styles/Currency.module.scss';

// Redux
import { useSelector } from 'react-redux';

const Currency = () => {
  const currency = useSelector((state: any) => {return state.gameReducer.currency});

  return (
    <div className={styles.container}>
      <p>
        $<span>{currency}</span>
      </p>
    </div>
  )
}

export default Currency;