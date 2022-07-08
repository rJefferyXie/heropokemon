// React and Styling
import React from 'react';
import styles from '../styles/HeroTip.module.scss';

// Animations
import { motion } from 'framer-motion';
import HeroTipLeft from '../animations/heroTipLeft';
import HeroTipRight from '../animations/heroTipRight';

interface HeroTipProps {
  content: string,
  order: number
}

const HeroTip = (props: React.PropsWithChildren<HeroTipProps>) => {
  const { content, order } = props;

  return (
    <motion.div 
      className={styles.container}
      key="modal" 
      initial="hidden" 
      animate="visible" 
      exit="exit"
      transition={{delay: order, duration: 1, type: "spring"}}
      variants={order % 2 === 0 ? HeroTipLeft : HeroTipRight}
    >
    {content}
    </motion.div>
  )
}

export default HeroTip;