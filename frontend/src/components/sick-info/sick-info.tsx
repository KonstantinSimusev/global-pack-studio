import styles from './sick-info.module.css';

// import { countProfessionsByLocation } from '../../../utils/utils';
import { SPECIAL_PROFESSIONS } from '../../utils/types';

export const SickInfo = () => {
  // const workerList = countProfessionsByLocation(list);
  const count = 1;
  return (
    <div className={styles.container}>
      <span className={styles.location}>БОЛЬНИЧНЫЙ ЛИСТ</span>
      {count > 0 ? (
        <>
          <div className={styles.table}>
            <span>Профессия</span>
            <span>Кол-во</span>
          </div>

          <ul className={styles.wrapper__worker}>
            {SPECIAL_PROFESSIONS.map((item, index) => (
              <li key={index}>
                <div className={styles.table}>
                  <span>{item}</span>
                  <span>-</span>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.wrapper__footer}>
            <span>Всего:</span>
            <span>3 чел</span>
          </div>
        </>
      ) : (
        <span className={styles.no__sick}>Все здоровые</span>
      )}
    </div>
  );
};
