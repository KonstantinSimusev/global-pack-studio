import styles from './shift-list.module.css';

import { useEffect } from 'react';

import { EditButton } from '../buttons/edit/edit';
import { DeleteButton } from '../buttons/delete/delete';

import { useDispatch, useSelector } from '../../services/store';
import { getShifts } from '../../services/slices/shift/actions';
import { selectShifts } from '../../services/slices/shift/slice';

import { formatDate } from '../../utils/utils';

export const ShiftList = () => {
  const dispatch = useDispatch();
  const shifts = useSelector(selectShifts);

  useEffect(() => {
    dispatch(getShifts());
  }, []);
  return (
    <>
      {shifts.length > 0 ? (
        <ul className={styles.list}>
          {shifts.map((shift, index) => (
            <li key={shift.id} className={styles.item}>
              <span className={styles.index}>
                {String(shifts.length - index).padStart(2, '0')}
              </span>
              <div className={styles.wrapper}>
                <span className={styles.date}>{formatDate(shift.date)}</span>
                <span className={styles.shift_number}>
                  Смена {shift.shiftNumber}
                </span>
              </div>

              <div>
                <EditButton />
                <DeleteButton />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>Смены не найдены</div>
      )}
    </>
  );
};
