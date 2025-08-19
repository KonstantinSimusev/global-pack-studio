import styles from './overlay.module.css';

import { useContext } from 'react';
import { MenuContext } from '../../contexts/menuContext';

export const Overlay = () => {
  const { isOpen, setIsOpen } = useContext(MenuContext);

  const handleClick = (event: React.MouseEvent) => {
    // Проверяем, был ли клик по самому оверлею
    if (event.target === event.currentTarget) {
      setIsOpen(!isOpen);
    }
  };

  return <div className={styles.overlay} onClick={handleClick}></div>;
};
