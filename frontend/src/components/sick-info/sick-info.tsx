import styles from './sick-info.module.css';

// import { countProfessionsByLocation } from '../../../utils/utils';
// import { SPECIAL_PROFESSIONS } from '../../utils/types';
import { Border } from '../ui/border/border';
import { TEAM_PROFESSION_OPTIONS } from '../../utils/types';

export const SickInfo = () => {
  // const workerList = countProfessionsByLocation(list);
  const count = 1;
  return (
    <div className={styles.container}>
      <span className={styles.location}>БОЛЬНИЧНЫЙ ЛИСТ</span>
      {count > 0 ? (
        <>
          <ul className={styles.wrapper__list}>
            <Border className={styles.border__bottom} />
            {TEAM_PROFESSION_OPTIONS.map((item, index) => (
              <li className={styles.wrapper} key={index}>
                <span className={styles.text}>{item}</span>
                <span className={styles.count}>-</span>
              </li>
            ))}
            <Border className={styles.border__top} />
          </ul>

          <div className={styles.wrapper__footer}>
            <span>Всего:</span>
            <span>3</span>
          </div>
        </>
      ) : (
        <span className={styles.no__sick}>Все здоровые</span>
      )}
    </div>
  );
};
