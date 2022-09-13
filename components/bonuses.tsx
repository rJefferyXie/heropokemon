// React and Styling
import { useState } from 'react';
import styles from '../styles/Bonuses.module.scss';

// Constants
import Abilities from '../constants/Abilities';

// Components
import IconImage from './reusable/iconImage';

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

  const toggle = () => {
    if (ability === undefined) return;

    // Turn off or turn on the auto healer or auto swapper abilities
    const newBonuses = JSON.parse(JSON.stringify(bonus.bonuses));
    newBonuses[ability.id].activated = !newBonuses[ability.id].activated;
    dispatch(allActions.bonusActions.setBonuses(newBonuses));
  }

  const purchase = () => {
    if (ability === undefined) return;

    const maxLevel = bonus.bonuses[ability.id].level + 1 === 7;
    const cantAfford = bonus.bonusPoints < ability.cost(bonus.bonuses[ability.id].level + 1);
    if (maxLevel || cantAfford) return;

    const newAbility = JSON.parse(JSON.stringify(ability));
    const newBonuses = JSON.parse(JSON.stringify(bonus.bonuses));

    // Unlock and activate the auto swapper or auto healer
    if (newBonuses[newAbility.id].unlocked === false) {
      newBonuses[newAbility.id].unlocked = true;
      newBonuses[newAbility.id].activated = true;
    }

    // Buying any of the first five abilities
    if (newBonuses[newAbility.id].level !== -1) {
      newBonuses[newAbility.id].level += 1;
      newAbility.level += 1;
      setAbility(newAbility);
    }

    // Update player bonus points and new bonuses
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
                initial="hidden" 
                animate="visible" 
                exit="exit" 
                variants={DropInTop}
                >
                <div className={styles.previewRow}>
                  <div className={styles.abilityCol}>
                    <IconImage
                      size="large"
                      src={ability.image}
                      alt={ability.name(bonus.bonuses[ability.id].level + 1)} 
                    >
                    </IconImage>
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
                    {(bonus.bonuses[ability.id].unlocked && bonus.bonuses[ability.id].unlocked === true) 
                      && <p className={styles.toggleText}>{"This ability is " + (bonus.bonuses[ability.id].activated ? "activated." : "deactivated.")}</p>
                    }
                    <div className={styles.buttonContainer}>
                      <Button className={styles.exitButton} variant="contained" onClick={exit}>CANCEL</Button>
                      {!(bonus.bonuses[ability.id].unlocked && bonus.bonuses[ability.id].unlocked === true) ?
                        <Button className={styles.confirmButton} variant="contained" onClick={purchase}>PURCHASE</Button> :
                        <Button className={styles.confirmButton} variant="contained" onClick={toggle}>
                          {bonus.bonuses[ability.id].activated ? "Turn off" : "Turn on"}
                        </Button>
                      }
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
            <IconImage
              size="small"
              src={ability.image}
              alt={ability.name(bonus.bonuses[ability.id].level)}
            >
            </IconImage>
            <p className={styles.abilityName}>
              {ability.name(bonus.bonuses[ability.id].level)}
            </p>
            <p className={styles.abilityCost}>
              {bonus.bonuses[ability.id].unlocked && bonus.bonuses[ability.id].unlocked === true ?
              bonus.bonuses[ability.id].activated ? "Activated" : "Disabled" :
              "Cost: " + ability.cost(bonus.bonuses[ability.id].level + 1) + " BP"}
            </p>
          </div>
        })}
      </div>
    </div>      
  );
}

export default Bonuses;