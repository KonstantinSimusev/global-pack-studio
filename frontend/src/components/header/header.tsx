import styles from './header.module.css';

import { useState } from 'react';

import { useEscapeHandler } from '../../hooks/useEscapeHandler';

import { LogoIcon } from '../icons/logo/logo';
import { BurgerIcon } from '../icons/burger/burger';
import { Menu } from '../menu/menu';
import { Overlay } from '../overlay/overlay';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Используем кастомный хук
  useEscapeHandler(() => {
    if (isMenuOpen) {
      closeMenu();
    }
  });

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <a className={styles.header__logo} href="/">
        <LogoIcon />
      </a>
      <h1 className={styles.header__title}>Global Pack Studio</h1>
      <BurgerIcon onClick={openMenu} />

      {isMenuOpen && <Overlay onClose={closeMenu} />}
      <Menu onClose={closeMenu} isOpen={isMenuOpen} />
    </header>
  );
};
