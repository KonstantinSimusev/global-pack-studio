import { useState } from 'react';
import styles from './menu.module.css';

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Формируем классы вручную
  const menuClass = [styles.menu];
  if (isOpen) menuClass.push(styles['menu--open']);

  const iconClass = [styles.icon];
  if (isOpen) iconClass.push(styles['icon--cross']);

  return (
    <div className={styles['burger-container']}>
      <div className={iconClass.join(' ')} onClick={toggleMenu}>
        {isOpen ? (
          <div className={styles.cross}>
            <div className={styles.line1}></div>
            <div className={styles.line2}></div>
          </div>
        ) : (
          <div className={styles.hamburger}>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
        )}
      </div>
      <nav className={menuClass.join(' ')}>
        <ul>
          <li>Главная</li>
          <li>О нас</li>
          <li>Контакты</li>
        </ul>
      </nav>
    </div>
  );
};