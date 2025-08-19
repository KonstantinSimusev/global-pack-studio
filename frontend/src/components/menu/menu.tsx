import styles from './menu.module.css';
import clsx from 'clsx';

import { useContext, useState } from 'react';

import { CloseIcon } from '../icons/close/close';
import { Switch } from '../switch/switch';
import { MenuContext } from '../../contexts/menuContext';

type TMenuProps = {
  onClose: () => void;
  // isOpen: boolean; // Добавляем пропс для состояния открытия
};

export const Menu = ({ onClose }: TMenuProps) => {
  const { isOpen } = useContext(MenuContext);
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
    <div
      className={clsx(styles.container, { [styles.menu__open]: isOpen })}
      onClick={handleMenuClick}
    >
      <CloseIcon onClick={onClose} />
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
