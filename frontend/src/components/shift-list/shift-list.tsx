import styles from './shift-list.module.css';

import { useEffect } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import { getTeamShifts } from '../../services/slices/shift/actions';
import { selectShifts } from '../../services/slices/shift/slice';

import { formatDate } from '../../utils/utils';
import { EditButton } from '../buttons/edit/edit';
import { DeleteButton } from '../buttons/delete/delete';

export const ShiftList = () => {
  const dispatch = useDispatch();
  const shifts = useSelector(selectShifts);

  const currentDay = new Date();
  const currentMonth = currentDay.toLocaleString('ru', { month: 'long' });

  useEffect(() => {
    dispatch(getTeamShifts());
  }, []);
  return (
    <>
      {shifts.length > 0 ? (
        <ul className={styles.list}>
          {shifts.map((shift, index) => (
            <li key={shift.id} className={styles.item}>
              <div className={styles.wrapper__header}>
                <span className={styles.index}>
                  {String(shifts.length - index).padStart(2, '0')}
                </span>
                <div className={styles.wrapper__button}>
                  <EditButton id={shift.id} />
                  <DeleteButton id={shift.id} />
                </div>
              </div>
              <div className={styles.wrapper__info}>
                <span className={styles.shift__number}>
                  Смена {shift.shiftNumber}
                </span>
                <span className={styles.date}>{formatDate(shift.date)}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>За {currentMonth} смен нет</div>
      )}
    </>
  );
};
