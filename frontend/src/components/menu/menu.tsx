import styles from './menu.module.css';
import clsx from 'clsx';

import { useState } from 'react';

import { Switch } from '../switch/switch';
import { CloseIcon } from '../icons/close/close';

export const Menu = () => {
  const [isMenuClosed, setIsMenuClosed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const closeMenu = () => {
    setIsMenuClosed(!isMenuClosed);
  };

  const signIn = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  // Функция для предотвращения закрытия при клике на элементы меню
  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Останавливаем распространение события
  };

  return (
    <div
      className={clsx(styles.container, styles.menuOpen, {
        [styles.menuClosed]: isMenuClosed,
      })}
    >
      <CloseIcon onClick={closeMenu} />
      <nav className={styles.nav} onClick={handleMenuClick}>
        <ul className={styles.list}>
          <li className={styles.item}>Главная</li>
          <li className={styles.item}>
            {!isAuthenticated ? 'Личный кабинет' : ''}
          </li>
          <li className={styles.item} onClick={signIn}>
            {!isAuthenticated ? 'Выйти из аккаунта' : 'Войти в аккаунт'}
          </li>
        </ul>
      </nav>
      <Switch />
    </div>
  );
};
