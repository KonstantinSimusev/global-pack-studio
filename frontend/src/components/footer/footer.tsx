import styles from './footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.container}>
      <a className={styles.copyright} href="#">
        © Global Pack Studio
      </a>
    </footer>
  );
};
