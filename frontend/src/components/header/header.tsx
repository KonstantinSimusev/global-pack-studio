import styles from './header.module.css';

import { useContext } from 'react';
import { Menu } from '../menu/menu';
import { LogoIcon } from '../icons/logo/logo';
import { BurgerIcon } from '../icons/burger/burger';
import { Overlay } from '../overlay/overlay';
import { useEscapeHandler } from '../../hooks/useEscapeHandler';
import { MenuContext } from '../../contexts/menuContext';

export const Header = () => {
  const { isOpen, setIsOpen } = useContext(MenuContext);

  // Используем кастомный хук
  useEscapeHandler(() => {
    if (isOpen) {
      setIsOpen(!isOpen);
    }
  });

  return (
    <header className={styles.header}>
      <a className={styles.header__logo} href="/">
        <LogoIcon />
      </a>
      <h1 className={styles.header__title}>Global Pack Studio</h1>
      <BurgerIcon />
      {isOpen && <Overlay />}
      <Menu />
    </header>
  );
};
