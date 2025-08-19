import styles from './loader.module.css';

import { Overlay } from '../overlay/overlay';

export const Loader = () => {
  return (
    <>
      <Overlay />
      <div className={styles.loader}>
        <span className={styles.loader__spinner}></span>
        <span className={styles.loader__text}>Загрузка...</span>
      </div>
    </>
  );
};
