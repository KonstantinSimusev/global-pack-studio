import styles from './menu.module.css';
import clsx from 'clsx';

import { useContext } from 'react';
import { Switch } from '../switch/switch';
import { LayerContext } from '../../contexts/layerContext';
import { ThemeContext } from '../../contexts/themeContext';
import { CloseButton } from '../buttons/close/close';
// import { useEscapeHandler } from '../../hooks/useEscapeHandler';
// import { Overlay } from '../overlay/overlay';

export const Menu = () => {
  const { isLightTheme } = useContext(ThemeContext);
  const { isOpenMenu, setIsOpenMenu, setIsOpenModal } = useContext(LayerContext);

  const signIn = () => {
    setIsOpenMenu(false);
    setIsOpenModal(true);
  };

  // Функция для предотвращения закрытия при клике на элементы меню
  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Останавливаем распространение события
  };

  return (
    <div
      className={clsx(
        styles.container,
        isOpenMenu && styles.menu__open,
        isLightTheme ? 'theme-light' : 'theme-dark',
      )}
      onClick={handleMenuClick}
    >
      <CloseButton />
      <nav className={styles.navigation}>
        <ul className={styles.navigation__list}>
          <li className={styles.link}>
            {/* {!isAuthenticated ? 'Личный кабинет' : ''} */}
          </li>
          <li className={styles.link} onClick={signIn}>
            Вход в аккаунт
          </li>
        </ul>
      </nav>
      <Switch />
    </div>
  );
};
