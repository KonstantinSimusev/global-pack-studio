import styles from './timesheet.module.css';

import { useEffect } from 'react';

import { AddButton } from '../../buttons/add/add-button';
import { ShiftList } from '../../lists/shift-list/shift-list';

import { useDispatch, useSelector } from '../../../services/store';

import { getTeamShifts } from '../../../services/slices/shift/actions';
import { selectShifts } from '../../../services/slices/shift/slice';

export const Timesheet = () => {
  const dispatch = useDispatch();
  const shifts = useSelector(selectShifts);

  useEffect(() => {
    dispatch(getTeamShifts());
  }, []);

  return (
    <main className={styles.container}>
      <AddButton actionType="shift" />
      <ShiftList items={shifts} />
    </main>
  );
};
