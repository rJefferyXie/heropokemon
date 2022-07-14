// React and Styling
import React, { useState } from 'react';
import styles from '../styles/Shop.module.scss';

// Constants
import ShopItems from '../constants/ShopItems';

// Interfaces
import ShopItem from '../interfaces/ShopItem';

// MUI
import { ClickAwayListener, Button } from '@mui/material';

// Animations
import { motion, AnimatePresence } from 'framer-motion';
import DropInTop from '../animations/dropInTop';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const Shop = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state: any) => {return state.gameReducer.currency});
  const items = useSelector((state: any) => {return state.itemReducer.items})

  const [itemAmount, setItemAmount] = useState(0);
  const [item, setItem] = useState<ShopItem>();

  const selectItem = (selectedItem: ShopItem) => {
    setItem(selectedItem);
  }

  const exit = () => {
    setItem(undefined);
    setItemAmount(0);
  }

  const purchase = () => {
    if (!item) return;

    const newCurrency = currency - item.cost * itemAmount;
    const newItems = JSON.parse(JSON.stringify(items));

    if (Object.keys(newItems).includes(item.id)) {
      newItems[item.id].quantity += itemAmount;
    } else {
      newItems[item.id] = {
        name: item.name,
        image: item.image,
        quantity: itemAmount,
        description: item.description,
      };
    }

    dispatch(allActions.gameActions.setCurrency(newCurrency));
    dispatch(allActions.itemActions.setItems(newItems));
    exit();
  }

  const increment = () => {
    if (!item) {
      exit();
      return;
    }

    if ((itemAmount + 1) * item.cost > currency) return;
    

    setItemAmount(itemAmount => itemAmount + 1);
  }

  const decrement = () => {
    if (!item) {
      exit();
      return;
    }

    if (itemAmount === 0) {
      setItemAmount(Math.floor(currency / item.cost));
      return;
    }

    setItemAmount(itemAmount => itemAmount - 1);
  }

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {item !== undefined &&
          <div className={styles.overlay}>
            <ClickAwayListener onClickAway={exit}>
              <motion.div className={styles.itemPreview} 
                key="modal" 
                initial="hidden" 
                animate="visible" 
                exit="exit" 
                variants={DropInTop}
                >
                <div className={styles.previewRow}>
                  <div className={styles.itemCol}>
                    <img className={styles.imagePreview} src={item.image} alt={item.name}></img>
                    <p className={styles.costPreview}>{"$" + item.cost}</p>
                    <p className={styles.namePreview}>{item.name}</p>
                    <p className={styles.itemDescription}>{item.description}</p>
                  </div>
                  <div className={styles.infoCol}>
                    <h3 className={styles.infoHeader}>How many would you like?</h3>
                    <p className={styles.currency}>{"You have: $" + currency}</p>
                    <p className={styles.itemCalculation}>{"It will cost $" + itemAmount * item.cost + " to purchase " + itemAmount + " " + item.name + "s."}</p>
                    <div className={styles.buttonContainer}>
                      <Button className={styles.decButton} variant="contained" onClick={decrement}>-</Button>
                      <Button className={styles.incButton} variant="contained" onClick={increment}>+</Button>
                    </div>
                    <div className={styles.buttonContainer}>
                      <Button className={styles.exitButton} variant="contained" onClick={purchase}>CANCEL</Button>
                      <Button className={styles.confirmButton} variant="contained" onClick={purchase}>PURCHASE</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ClickAwayListener>
          </div>
        }
      </AnimatePresence>

      {ShopItems.map((item: ShopItem, idx) => {
        return <div onClick={() => selectItem(item)} className={styles.shopItem} key={idx}>
          <img className={styles.itemImage} src={item.image} alt={item.name}></img>
          <p className={styles.itemCost}>{"$" + item.cost}</p>
          <p className={styles.itemName}>{item.name}</p>
        </div>
      })}
    </div>
  )
}

export default Shop;