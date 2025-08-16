import styles from './header.module.css';

import { useState } from 'react';

import { LogoIcon } from '../icons/logo/logo';
import { BurgerIcon } from '../icons/burger/burger';
import { Menu } from '../menu/menu';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className={styles.container}>
        <a className={styles.logo} href="/">
          <LogoIcon />
          <h1 className={styles.title}>Global Pack Studio</h1>
        </a>
        <BurgerIcon onClick={openMenu} />

        {isMenuOpen && <Menu />}
      </div>
    </>
  );
};
