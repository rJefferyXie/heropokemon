// Next
import ExportedImage from 'next-image-export-optimizer';

// React and Styling
import { useState } from 'react';
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

    // Adjust items and currency accordingly.
    const newCurrency = currency - item.cost * itemAmount;
    const newItems = JSON.parse(JSON.stringify(items));

    /* 
      If item exists in item dictionary, increment quantity. 
      Else, create new item entry. 
    */
    if (Object.keys(newItems).includes(item.id)) {
      newItems[item.id].quantity += itemAmount;
    } else {
      newItems[item.id] = {
        name: item.name,
        image: item.image,
        id: item.id,
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

    // Ensure we cannot select more than we can afford.
    if ((itemAmount + 1) * item.cost > currency) return;
    setItemAmount(itemAmount => itemAmount + 1);
  }

  const decrement = () => {
    if (!item) {
      exit();
      return;
    }

    // Go to max amount the player can afford.
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
                initial="hidden" 
                animate="visible" 
                exit="exit" 
                variants={DropInTop}
                >
                <div className={styles.previewRow}>
                  <div className={styles.itemCol}>
                    <div className={styles.imagePreview}>
                      <ExportedImage 
                        layout="fixed" 
                        width="128px" 
                        height="128px" 
                        alt={item.name} 
                        src={item.image}
                      >
                      </ExportedImage>
                    </div>
                    <p className={styles.costPreview}>{"$" + item.cost}</p>
                    <p className={styles.namePreview}>{item.name}</p>
                    <p className={styles.itemDescription}>{item.description}</p>
                    <p className={styles.itemQuantity}>{"You have " + (items[item.id] ? items[item.id].quantity : 0) + " of this item."}</p>
                  </div>
                  <div className={styles.infoCol}>
                    <h3 className={styles.infoHeader}>How many would you like?</h3>
                    <p className={styles.currency}>{"You have: $" + currency}</p>
                    <p className={styles.itemCalculation}>
                      {"It will cost $" + itemAmount * item.cost + 
                      " to purchase " + itemAmount + " " + 
                      ((item.name === "Rare Candy" && (itemAmount > 1 || itemAmount === 0)) ? "Rare Candie" : item.name) + 
                      (((item.name.includes("Potion") || (item.name === "Rare Candy")) 
                      && (itemAmount > 1 || itemAmount === 0)) ? "s" : '') + "."
                      }
                    </p>
                    <div className={styles.buttonContainer}>
                      <Button className={styles.decButton} variant="contained" onClick={decrement}>-</Button>
                      <Button className={styles.incButton} variant="contained" onClick={increment}>+</Button>
                    </div>
                    <div className={styles.buttonContainer}>
                      <Button className={styles.exitButton} variant="contained" onClick={exit}>CANCEL</Button>
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
          <div className={styles.itemImage}>
            <ExportedImage 
              layout="fixed" 
              width="64px" 
              height="64px" 
              alt={item.name} 
              src={item.image}
            >
            </ExportedImage>
          </div>
          <p className={styles.itemCost}>{"$" + item.cost}</p>
          <p className={styles.itemName}>{item.name}</p>
        </div>
      })}
    </div>
  );
}

export default Shop;