import styles from './timesheet.module.css';

import { useEffect } from 'react';

import { useDispatch, useSelector } from '../../../services/store';
import { getTeamShifts } from '../../../services/slices/shift/actions';
import { AddButton } from '../../buttons/add/add-button';
import { ShiftList } from '../../shift-list/shift-list';
import { selectUser } from '../../../services/slices/auth/slice';

export const Timesheet = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeamShifts());
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.shift_info}>
        <span className={styles.team_number}>
          Бригада {user?.teamNumber ?? '-'}
        </span>
        <div className={styles.master}>
          <span className={styles.text}>Мастер</span>
          <span className={styles.text}>
            <span className={styles.text}>{user?.lastName ?? '-'} </span>
            <span className={styles.text}>{user?.firstName ?? ''} </span>
            <span className={styles.text}>{user?.patronymic ?? ''}</span>
          </span>
        </div>
      </div>
      <AddButton actionType="shift" />
      <ShiftList />
    </div>
  );
};
