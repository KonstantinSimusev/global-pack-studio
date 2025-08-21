import clsx from 'clsx';
import styles from './loader.module.css';

export const Loader = ({ isVisible = false }) => {
  return (
    <span
      className={clsx(styles.loader, isVisible && styles.loader__visible)}
    ></span>
  );
};
