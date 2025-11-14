import styles from './production.module.css';

import { ProductionList } from '../../lists/production-list/production-list';
import { useDispatch, useSelector } from '../../../services/store';
import { selectShifts } from '../../../services/slices/shift/slice';
import { formatDate } from '../../../utils/utils';
import { useEffect } from 'react';
import { getTeamShifts } from '../../../services/slices/shift/actions';

export const Production = () => {
  const dispatch = useDispatch();
  const shifts = useSelector(selectShifts);
  const lastShift = shifts[0];

  useEffect(() => {
    dispatch(getTeamShifts());
  }, []);

  return (
    <main className={styles.container}>
      {lastShift ? (
        <>
          <h5 className={styles.header__title}>ПРОИЗВОДСТВО</h5>
          <div className={styles.wrapper__info}>
            <div className={styles.wrapper}>
              <span className={styles.title}>Дата</span>
              <span className={styles.text}>{formatDate(lastShift.date)}</span>
            </div>

            <div className={styles.wrapper}>
              <span className={styles.title}>№ смены</span>
              <span className={styles.text}>Смена {lastShift.shiftNumber}</span>
            </div>

            <div className={styles.wrapper}>
              <span className={styles.title}>№ бригады</span>
              <span className={styles.text}>
                Бригада {lastShift.teamNumber}
              </span>
            </div>
          </div>
          <ProductionList />
        </>
      ) : (
        <span className={styles.text__info}>Пожалуйста, создайте смену...</span>
      )}
    </main>
  );
};
