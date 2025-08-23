import styles from './error.module.css';

export const ErrorIcon = () => {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.99V17m0-10v7"/>
    </svg>
  );
};
