import styles from './menu.module.css';
import clsx from 'clsx';

import { useContext, useState } from 'react';
import { Switch } from '../switch/switch';
import { CloseIcon } from '../icons/close/close';
import { MenuContext } from '../../contexts/menuContext';
import { ThemeContext } from '../../contexts/themeContext'

export const Menu = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { isOpen } = useContext(MenuContext);
  const { isLightTheme } = useContext(ThemeContext);

  const signIn = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  // Функция для предотвращения закрытия при клике на элементы меню
  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Останавливаем распространение события
  };

  return (
    <div
      className={clsx(
        styles.container,
        isOpen && styles.menu__open,
        isLightTheme ? 'theme-light' : 'theme-dark',
      )}
      onClick={handleMenuClick}
    >
      <CloseIcon />
      <nav className={styles.navigation}>
        <ul className={styles.navigation__list}>
          <li className={styles.link}>Главная</li>
          <li className={styles.link}>Тестирование</li>
          <li className={styles.link}>
            {!isAuthenticated ? 'Личный кабинет' : ''}
          </li>
          <li className={styles.link} onClick={signIn}>
            {!isAuthenticated ? 'Выйти' : 'Войти'}
          </li>
        </ul>
      </nav>
      <Switch />
    </div>
  );
};
