import styles from './sidebar.module.css';
import clsx from 'clsx';

import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { CloseButton } from '../buttons/close/close';
import { Switch } from '../switch/switch';

import { LayerContext } from '../../contexts/layer/layerContext';
import { ThemeContext } from '../../contexts/theme/themeContext';

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
  const location = useLocation(); // Добавляем хук для получения текущего пути

  const hanldeClick = () => {
    setIsOpenOverlay(false);
    setIsOpenMenu(false);
  };

  const hanldeClickLogin = () => {
    setIsOpenMenu(false);
    setIsLoginModalOpen(true);
  };

  const hanldeClickLogout = () => {
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
          <li
            className={clsx(
              styles.link,
              location.pathname === '/' && styles.link__active,
            )}
            onClick={hanldeClick}
          >
            <Link to="/">Главная</Link>
          </li>
          {isAuthenticated && (
            <li className={styles.link} onClick={hanldeClickLogin}>
              <Link to="/timesheet">Войти</Link>
            </li>
          )}

          {!isAuthenticated && (
            <>
              <li
                className={clsx(
                  styles.link,
                  location.pathname === '/timesheet' && styles.link__active,
                )}
                onClick={hanldeClick}
              >
                <Link to="/timesheet">Табель</Link>
              </li>
              <li className={clsx(
                  styles.link,
                  location.pathname === '/production' && styles.link__active,
                )} onClick={hanldeClick}>
                <Link to="/production">Производство</Link>
              </li>
              <li className={styles.link} onClick={hanldeClickLogout}>
                Выйти
              </li>
            </>
          )}
        </ul>
      </nav>
      <Switch />
    </div>
  );
};
