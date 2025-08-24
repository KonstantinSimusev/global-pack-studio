import styles from './sidebar.module.css';
import clsx from 'clsx';

import { useContext } from 'react';
import { Switch } from '../switch/switch';
import { LayerContext } from '../../contexts/layer/layerContext';
import { ThemeContext } from '../../contexts/theme/themeContext';
import { CloseButton } from '../buttons/close/close';

export const Sidebar = () => {
  const { isLightTheme } = useContext(ThemeContext);
  const { isOpenMenu, isAuth, setIsOpenOverlay, setIsOpenMenu, setIsLoginModalOpen, setIsAuth } =
    useContext(LayerContext);

  const goHome = () => {
    setIsAuth(false);
    setIsOpenOverlay(false);
    setIsOpenMenu(false);
  }

  const logIn = () => {
    setIsOpenMenu(false);
    setIsLoginModalOpen(true);
  };

  const logOut = () => {
    setIsAuth(false);
    setIsOpenOverlay(false);
    setIsOpenMenu(false);
    
  }

  // Функция для предотвращения закрытия при клике на элементы меню
  const handleMenuClick = (event: React.MouseEvent) => {
    // Останавливаем распространение события
    event.stopPropagation();
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
          <li className={styles.link} onClick={goHome}>
            {isAuth ? 'Главная страница' : ''}
          </li>
          <li className={styles.link} onClick={logIn}>
            {isAuth ? 'Личный кабинет' : 'Войти'}
          </li>
          <li className={styles.link} onClick={logOut}>
            {isAuth ? 'Выйти' : ''}
          </li>
        </ul>
      </nav>
      <Switch />
    </div>
  );
};
