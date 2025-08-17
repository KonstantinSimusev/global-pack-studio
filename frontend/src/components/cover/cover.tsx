import { ThemeButton } from '../theme-button/theme-button';
import styles from './cover.module.css';

export const Cover = () => {
  return (
    <div className={styles.container}>
      <ThemeButton />
      <h2 className={styles.title}>
        <span className={styles.text__top}>Innovation</span>
        <span className={styles.text__bottom}>Technology</span>
      </h2>
    </div>
  );
};
