import styles from './menu.module.css';

import { useState } from 'react';

import { Switch } from '../switch/switch';
import { CloseIcon } from '../icons/close/close';

type TMenuProps = {
  onClose: () => void;
};

export const Menu = ({ onClose }: TMenuProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Добавьте состояние для открытия/закрытия меню

  const signIn = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  // Функция для предотвращения закрытия при клике на элементы меню
  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Останавливаем распространение события
  };

  return (
    <div className={styles.menu} onClick={handleMenuClick}>
      <CloseIcon onClick={onClose} />
      <nav className={styles.navigation}>
        <ul className={styles.navigation__list}>
          <li className={styles.navigation__item}>Главная</li>
          <li className={styles.navigation__item}>Личный кабинет</li>
          <li className={styles.navigation__item} onClick={signIn}>
            {!isAuthenticated ? 'Выйти' : 'Войти'}
          </li>
        </ul>
      </nav>
      <Switch />
    </div>
  );
};
