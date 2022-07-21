// Next
import ExportedImage from 'next-image-export-optimizer';

// React and Styling
import React, { useState } from 'react';
import styles from '../styles/Bonuses.module.scss';

// Constants
import Abilities from '../constants/Abilities';

// Game Functions
import experienceForLevel from '../gameFunctions/experienceForLevel';

// Interfaces
import Ability from '../interfaces/Ability';

// MUI
import { ClickAwayListener, Button } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// Animations
import { motion, AnimatePresence } from 'framer-motion';
import DropInTop from '../animations/dropInTop';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import allActions from '../store/actions/allActions';

const Bonuses = () => {
  const dispatch = useDispatch();
  const bonus = useSelector((state: any) => {return state.bonusReducer});

  const [ability, setAbility] = useState<Ability>();

  const selectAbility = (selectedAbility: Ability) => {
    setAbility(selectedAbility);
  }

  const purchase = () => {
    if (ability === undefined) return;
    if ((bonus.bonuses[ability.id].level + 1) === 7 ||
      bonus.bonusPoints < ability.cost(bonus.bonuses[ability.id].level + 1)) return;

    const newAbility = JSON.parse(JSON.stringify(ability));
    const newBonuses = JSON.parse(JSON.stringify(bonus.bonuses));
    if (newBonuses[newAbility.id].level !== -1) {
      newBonuses[newAbility.id].level += 1;
      newAbility.level += 1;
      setAbility(newAbility);
    }

    dispatch(allActions.bonusActions.setBonusPoints(bonus.bonusPoints - ability.cost(bonus.bonuses[ability.id].level + 1)));
    dispatch(allActions.bonusActions.setBonuses(newBonuses));
    exit();
  }

  const exit = () => {
    setAbility(undefined);
  }

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {ability !== undefined &&
          <div className={styles.overlay}>
            <ClickAwayListener onClickAway={exit}>
              <motion.div className={styles.abilityPreview} 
                key="modal" 
                initial="hidden" 
                animate="visible" 
                exit="exit" 
                variants={DropInTop}
                >
                <div className={styles.previewRow}>
                  <div className={styles.abilityCol}>
                    <div className={styles.imagePreview}>
                      <ExportedImage 
                        layout="fixed" 
                        width="128px" 
                        height="128px" 
                        alt={ability.name(bonus.bonuses[ability.id].level + 1)} 
                        src={ability.image}
                      >
                      </ExportedImage>
                    </div>
                    <p className={styles.namePreview}>{ability.name(bonus.bonuses[ability.id].level + 1)}</p>
                    <p className={styles.costPreview}>{"Cost: " + ability.cost(bonus.bonuses[ability.id].level + 1) + " BP"}</p>
                    <p className={styles.currency}>{"You have " + bonus.bonusPoints + " BP."}</p>
                  </div>
                  <div className={styles.infoCol}>
                    <p className={styles.abilityHeader}>{ability.name(bonus.bonuses[ability.id].level)}</p>
                    <p className={styles.abilityDescription}>{ability.description(bonus.bonuses[ability.id].level)}</p>
                    {bonus.bonuses[ability.id].level !== -1 && <ArrowDownwardIcon></ArrowDownwardIcon>}
                    {bonus.bonuses[ability.id].level !== -1 && <p>{ability.name(bonus.bonuses[ability.id].level + 1)}</p>}
                    {bonus.bonuses[ability.id].level !== -1 && <p className={styles.abilityDescription}>{ability.description(bonus.bonuses[ability.id].level + 1)}</p>}
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

      <p className={styles.text}>{"Level: " + bonus.level + ", Total XP: " + bonus.experience}</p>
      <p className={styles.text}>{"XP until next level: " + (experienceForLevel(bonus.level + 1) - bonus.experience)}</p>
      <p className={styles.pointText}>{"Bonus Points (BP): " + bonus.bonusPoints}</p>

      <div className={styles.abilityContainer}>
        {Abilities.map((ability: Ability, idx) => {
          return <div className={styles.ability} onClick={() => selectAbility(ability)} key={idx}>
            <div className={styles.abilityImage}>
              <ExportedImage 
                layout="fixed" 
                width="64px" 
                height="64px" 
                alt={ability.name(bonus.bonuses[ability.id].level + 1)} 
                src={ability.image}
              >
              </ExportedImage>
            </div>
            <p className={styles.abilityName}>
              {ability.name(bonus.bonuses[ability.id].level + 1)}
            </p>
            <p className={styles.abilityCost}>
              {"Cost: " + ability.cost(bonus.bonuses[ability.id].level + 1) + " BP"}
            </p>
          </div>
        })}
      </div>
    </div>      
  );
}

export default Bonuses;