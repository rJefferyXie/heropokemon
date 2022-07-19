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

// Game Functions
import UseItem from '../gameFunctions/useItem';

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
  const pokedex = useSelector((state: any) => {return state.pokedexReducer.pokedex});
  const team: PokemonMap[] = useSelector((state: any) => {return state.teamReducer.team});

  const [item, setItem] = useState<ShopItem>();

  const itemUse = (pokemonIdx: number) => {
    if (!item || !item.quantity || item.quantity === 0) {
      exit();
      return;
    }
  
    const { newItems, newTeam } = UseItem(item, items, team, pokemonIdx, pokedex);
    item.quantity -= 1;
    newItems[item.id].quantity -= 1;

    dispatch(allActions.itemActions.setItems(newItems));
    dispatch(allActions.teamActions.setTeam(newTeam));
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
                        src={"/" + item.image}
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
              src={"/" + items[item].image}
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