import styles from './sidebar.module.css';
import clsx from 'clsx';

import { useContext } from 'react';
import { Switch } from '../switch/switch';
import { LayerContext } from '../../contexts/layer/layerContext';
import { ThemeContext } from '../../contexts/theme/themeContext';
import { CloseButton } from '../buttons/close/close';
import { useSelector } from '../../services/store';
import { selectIsAuthenticated } from '../../services/slices/auth/slice';

export const Sidebar = () => {
  const { isLightTheme } = useContext(ThemeContext);
  const {
    isOpenMenu,
    setIsOpenOverlay,
    setIsOpenMenu,
    setIsLoginModalOpen,
    setIsLogoutOpenModal,
  } = useContext(LayerContext);

  const isAuthenticated = useSelector(selectIsAuthenticated);

  const goHome = () => {
    setIsOpenOverlay(false);
    setIsOpenMenu(false);
  };

  const login = () => {
    setIsOpenMenu(false);
    setIsLoginModalOpen(true);
  };

  const logout = () => {
    setIsOpenMenu(false);
    setIsLogoutOpenModal(true);
  };

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
            {!isAuthenticated ? 'Главная' : ''}
          </li>
          <li className={styles.link} onClick={goHome}>
            {!isAuthenticated ? 'Табель' : ''}
          </li>
          <li className={styles.link} onClick={goHome}>
            {!isAuthenticated ? 'Производство' : ''}
          </li>
          <li className={styles.link} onClick={logout}>
            {!isAuthenticated ? 'Выйти' : ''}
          </li>
          <li className={styles.link} onClick={login}>
            {!isAuthenticated ? 'Войти' : ''}
          </li>
        </ul>
      </nav>
      <Switch />
    </div>
  );
};
