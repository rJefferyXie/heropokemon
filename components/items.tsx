// Next
import ExportedImage from 'next-image-export-optimizer';

// React and Styling
import React, { useState } from 'react';
import styles from '../styles/Items.module.scss';

// Interfaces
import ShopItem from '../interfaces/ShopItem';
import PokemonMap from '../interfaces/PokemonMap';

// Components
import PokemonPreview from './pokemonPreview';

// MUI
import { ClickAwayListener, Button } from '@mui/material';

// Animations
import { motion, AnimatePresence } from 'framer-motion';
import DropInTop from '../animations/dropInTop';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const Items = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: any) => {return state.itemReducer.items});
  const team: PokemonMap[] = useSelector((state: any) => {return state.teamReducer.team});

  const [item, setItem] = useState<ShopItem>();

  const itemUse = (pokemonIdx: number) => {
    if (!item || !item.quantity || item.quantity === 0) {
      exit();
      return;
    }
    
    if (item.name === "Potion") {
      if (team[pokemonIdx].stats[0] >= team[pokemonIdx].stats[1]) return;

      const newTeam = JSON.parse(JSON.stringify(team));
      const newItems = JSON.parse(JSON.stringify(items));
      newItems["potion1"].quantity -= 1;
      item.quantity -= 1;

      if (newTeam[pokemonIdx].stats[0] + 20 >= newTeam[pokemonIdx].stats[1]) {
        newTeam[pokemonIdx].stats[0] = newTeam[pokemonIdx].stats[1];
      } else {
        newTeam[pokemonIdx].stats[0] += 20;
      }

      dispatch(allActions.itemActions.setItems(newItems));
      dispatch(allActions.teamActions.setTeam(newTeam));
    }
  }

  const selectItem = (selectedItem: ShopItem) => {
    setItem(selectedItem);
  }

  const exit = () => {
    setItem(undefined);
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
                  <div className={styles.itemColPreview}>
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
                    <p className={styles.namePreview}>{item.name}</p>
                    <p className={styles.quantityPreview}>{"Quantity: " + item.quantity}</p>
                    <p className={styles.descriptionPreview}>{item.description}</p>
                    <Button className={styles.exitButton} variant="contained" onClick={exit}>CANCEL</Button>
                  </div>
                  <div className={styles.infoColPreview}>
                    <div className={styles.teamRow}>
                      {team.map((pokemon, idx) => {
                        return <PokemonPreview pokemon={pokemon} teamIdx={idx} itemUse={itemUse} key={idx}></PokemonPreview>
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </ClickAwayListener>
          </div>
        }
      </AnimatePresence>

      {Object.keys(items).filter(item => items[item].quantity > 0).length <= 0 &&
        <p className={styles.emptyItems}>You have no items.</p>
      }

      {Object.keys(items).map((item, idx) => {
        return items[item].quantity > 0 && <div className={styles.item} onClick={() => selectItem(items[item])} key={idx}>
          <div className={styles.itemImage}>
            <ExportedImage 
              layout="fixed" 
              width="64px" 
              height="64px" 
              alt={items[item].name} 
              src={items[item].image}
            >
            </ExportedImage>
          </div>          
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