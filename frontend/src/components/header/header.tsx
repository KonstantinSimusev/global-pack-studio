import styles from './header.module.css';

import { Sidebar } from '../sidebar/sidebar';
import { LogoIcon } from '../icons/logo/logo';
import { BurgerButton } from '../buttons/burger/burger';

export const Header = () => {
  return (
    <header className={styles.container}>
      <a className={styles.logo} href="/">
        <LogoIcon />
      </a>
      <h1 className={styles.title}>Global Pack Studio</h1>
      <BurgerButton />
      <Sidebar />
    </header>
  );
};
