import styles from './header.module.css';

import { Sidebar } from '../sidebar/sidebar';
import { LogoIcon } from '../icons/logo/logo';
import { BurgerButton } from '../buttons/burger/burger';

import { useSelector } from '../../services/store';
import { selectIsAuthenticated } from '../../services/slices/auth/slice';

export const Header = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <header className={styles.container}>
      <a className={styles.logo} href="/">
        <LogoIcon />
      </a>
      <h1 className={styles.title}>
        {isAuthenticated ? 'МагМеталлПак' : 'Global Pack Studio'}
      </h1>
      <BurgerButton />
      <Sidebar />
    </header>
  );
};
