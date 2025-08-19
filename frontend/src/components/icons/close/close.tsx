import styles from './close.module.css';

import { useContext } from 'react';
import { MenuContext } from '../../../contexts/menuContext';

export const CloseIcon = () => {
  const { isOpen, setIsOpen } = useContext(MenuContext);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <svg className={styles.icon} viewBox="-0.5 0 25 25" onClick={handleClick}>
      <path d="m3 21.32 18-18M3 3.32l18 18" />
    </svg>
  );
};
