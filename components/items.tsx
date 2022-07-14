// React and Styling
import React from 'react';
import styles from '../styles/Items.module.scss';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const Items = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: any) => {return state.itemReducer.items})

  return (
    <div className={styles.container}>
      {Object.keys(items).map((item, idx) => {
        return items[item].quantity > 0 && <div className={styles.item} key={idx}>
          <img className={styles.itemImage} src={items[item].image} alt={items[item].name}></img>
          <div className={styles.infoCol}>
            <div className={styles.nameAndQuantity}>
              <p className={styles.itemName}>{items[item].name}</p>
              <p className={styles.itemQuantity}>{"Quantity: " + items[item].quantity}</p>
            </div>
            <p className={styles.itemDescription}>{items[item].description}</p>
          </div>
        </div>
      })}
    </div>
  )
}

export default Items;