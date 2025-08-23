import styles from './menu.module.css';
import clsx from 'clsx';

import { useContext } from 'react';
import { Switch } from '../switch/switch';
import { LayerContext } from '../../contexts/layer/layerContext';
import { ThemeContext } from '../../contexts/theme/themeContext';
import { CloseButton } from '../buttons/close/close';

export const Menu = () => {
  const { isLightTheme } = useContext(ThemeContext);
  const { isOpenMenu, setIsOpenMenu, setIsLoginModalOpen } =
    useContext(LayerContext);

  const signIn = () => {
    setIsOpenMenu(false);
    setIsLoginModalOpen(true);
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
          <li className={styles.link} onClick={signIn}>
            Войти
          </li>
        </ul>
      </nav>
      <Switch />
    </div>
  );
};
