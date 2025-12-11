import styles from './sick-info.module.css';

import { useEffect } from 'react';

import { Border } from '../ui/border/border';

import { useDispatch, useSelector } from '../../services/store';

import { getLastShiftsTeams } from '../../services/slices/shift/actions';
import { selectLastShiftsTeams } from '../../services/slices/shift/slice';

import { countProfessionsBySickLeave, getCount } from '../../utils/utils';

export const SickInfo = () => {
  const dispatch = useDispatch();

  const lastShiftsTeams = useSelector(selectLastShiftsTeams);
  const professions = countProfessionsBySickLeave(lastShiftsTeams);
  const total = getCount(professions);

  useEffect(() => {
    dispatch(getLastShiftsTeams());
  }, []);

  return (
    <div className={styles.container}>
      <span className={styles.location}>БОЛЬНИЧНЫЙ ЛИСТ</span>
      {total > 0 ? (
        <>
          <ul className={styles.wrapper__list}>
            <Border className={styles.border__bottom} />
            {professions.map((item, index) => (
              <li className={styles.wrapper} key={index}>
                <span className={styles.text}>{item.profession}</span>
                <span className={styles.count}>{item.count}</span>
              </li>
            ))}
            <Border className={styles.border__top} />
          </ul>

          <div className={styles.wrapper__footer}>
            <span>Всего:</span>
            <span>{total}</span>
          </div>
        </>
      ) : (
        <span className={styles.no__sick}>Все здоровые</span>
      )}
    </div>
  );
};
