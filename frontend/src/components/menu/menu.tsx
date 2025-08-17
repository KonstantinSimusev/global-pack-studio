import styles from './menu.module.css';
import clsx from 'clsx';

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
    <div
      className={clsx(styles.menu, styles.openMenu)}
      onClick={handleMenuClick}
    >
      <CloseIcon onClick={onClose} />
      <nav className={styles.navigation}>
        <ul className={styles.navigation__list}>
          <div className={styles.wrapper__item}>
            <li className={styles.navigation__item}>
              <a className={styles.link}>Главная</a>
            </li>
            <li className={styles.navigation__item}>
              <a className={styles.link}>Тестирование</a>
            </li>
          </div>
          <div className={styles.wrapper__item}>
            <li className={styles.navigation__item}>
              <a className={styles.link}>
                {!isAuthenticated ? 'Личный кабинет' : ''}
              </a>
            </li>
          </div>
          <div className={styles.wrapper__item}>
            <li className={styles.navigation__item}>
              <a className={styles.link} onClick={signIn}>
                {!isAuthenticated ? 'Выйти' : 'Войти'}
              </a>
            </li>
          </div>
        </ul>
      </nav>
      <Switch />
    </div>
  );
};
