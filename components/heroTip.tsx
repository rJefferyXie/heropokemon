// React and Styling
import React from 'react';
import styles from '../styles/HeroTip.module.scss';

interface HeroTipProps {
  content: string,
  order: number
}

const HeroTip = (props: React.PropsWithChildren<HeroTipProps>) => {
  const { content, order } = props;

  return (
    <div>{content}</div>
  )
}

export default HeroTip;