import styles from './burger.module.css';

import { useContext } from 'react';
import { MenuContext } from '../../../contexts/menuContext';

export const BurgerIcon = () => {
  const { isOpen, setIsOpen } = useContext(MenuContext);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <svg className={styles.icon} viewBox="0 0 24 24" onClick={handleClick}>
      <path d="M4 18h16M4 12h16M4 6h16" />
    </svg>
  );
};
