import styles from './timesheet.module.css';

import { useEffect } from 'react';

// import { Spinner } from '../../spinner/spinner';
import { AddButton } from '../../buttons/add/add-button';
import { ShiftList } from '../../shift-list/shift-list';

import { useDispatch, useSelector } from '../../../services/store';

import { getTeamShifts } from '../../../services/slices/shift/actions';
import { selectUser } from '../../../services/slices/auth/slice';
import { selectShifts } from '../../../services/slices/shift/slice';

export const Timesheet = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const shifts = useSelector(selectShifts);
  // const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    console.log('✅ Timesheet смонтирован');
    dispatch(getTeamShifts());
  }, []);

  console.log('🔁 Timesheet отрендерен');
  // Оптимизируем вычисление данных пользователя
  const teamNumber = user?.currentTeamNumber ?? '-';
  const fullName =
    `${user?.lastName ?? ''} ${user?.firstName ?? ''} ${
      user?.patronymic ?? ''
    }`.trim() || '-';
  const profession = user?.profession ?? '-';

  // if (isLoading) {
  //   return (
  //     <div className={styles.container__spiner}>
  //       <div className={styles.spinner}>{isLoading && <Spinner />}</div>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.container}>
      <div className={styles.shift_info}>
        <span className={styles.wrapper}>
          <span className={styles.title}>Бригада</span>
          <span className={styles.text}>№{teamNumber}</span>
        </span>
        <div className={styles.master}>
          <span className={styles.wrapper}>
            <span className={styles.title}>Руководитель</span>
            <span className={styles.text}>{fullName}</span>
          </span>
          <span className={styles.wrapper}>
            <span className={styles.title}>Должность</span>
            <span className={styles.text}>{profession}</span>
          </span>
        </div>
      </div>
      <AddButton actionType="shift" />
      <ShiftList items={shifts} />
    </div>
  );
};
