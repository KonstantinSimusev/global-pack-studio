import styles from './shift-list.module.css';

import { formatDate } from '../../../utils/utils';
import { EditButton } from '../../buttons/edit/edit';
import { useDispatch, useSelector } from '../../../services/store';
import { selectShifts } from '../../../services/slices/shift/slice';
import { useEffect } from 'react';
import { getTeamShifts } from '../../../services/slices/shift/actions';
// import { DeleteButton } from '../../buttons/delete/delete';

export const ShiftList = () => {
  const dispatch = useDispatch();
  const list = useSelector(selectShifts);

  useEffect(() => {
    dispatch(getTeamShifts());
  }, []);
  return (
    <>
      {list.length > 0 ? (
        <ul className={styles.list}>
          {list.map((item) => (
            <li key={item.id} className={styles.item}>
              <div className={styles.wrapper__info}>
                <div className={styles.wrapper}>
                  <span className={styles.title}>Дата</span>
                  <span className={styles.text}>{formatDate(item.date)}</span>
                </div>

                <div className={styles.wrapper}>
                  <span className={styles.title}>№ смены</span>
                  <span className={styles.text}>Смена {item.shiftNumber}</span>
                </div>

                <div className={styles.wrapper}>
                  <span className={styles.title}>№ бригады</span>
                  <span className={styles.text}>Бригада {item.teamNumber}</span>
                </div>
              </div>
              <div className={styles.card}>
                <h5 className={styles.header__title}>ТАБЕЛЬ</h5>
                <EditButton
                  id={item.id}
                  actionType="timesheet"
                  iconWidth={30}
                  iconHeight={30}
                />
                {/* <DeleteButton
                  id={item.id}
                  actionType="shift"
                  iconWidth={30}
                  iconHeight={30}
                /> */}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <span className={styles.text__info}>Пожалуйста, создайте смену...</span>
      )}
    </>
  );
};
