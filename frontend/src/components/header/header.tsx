import styles from './header.module.css';

import { useContext } from 'react';

import { useEscapeHandler } from '../../hooks/useEscapeHandler';

import { LogoIcon } from '../icons/logo/logo';
import { BurgerIcon } from '../icons/burger/burger';
import { Menu } from '../menu/menu';
import { Overlay } from '../overlay/overlay';
import { MenuContext } from '../../contexts/menuContext';

export const Header = () => {
  const { isOpen, setIsOpen } = useContext(MenuContext);

  // Используем кастомный хук
  useEscapeHandler(() => {
    if (isOpen) {
      closeMenu();
    }
  });

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <a className={styles.header__logo} href="/">
        <LogoIcon />
      </a>
      <h1 className={styles.header__title}>Global Pack Studio</h1>
      <BurgerIcon onClick={openMenu} />

      {isOpen && <Overlay onClose={closeMenu} />}
      <Menu onClose={closeMenu} />
    </header>
  );
};
