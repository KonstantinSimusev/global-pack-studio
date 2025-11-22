import styles from './timesheet.module.css';

import { useEffect } from 'react';

import { Layout } from '../../ui/layout/layout';
import { PageTitle } from '../../ui/page-title/page-title';
import { ShiftInfo } from '../../shift-info/shift-info';
import { TeamProfessionList } from '../../lists/profession-list/profession-list';
import { UserShiftList } from '../../lists/user-shift-list/user-shift-list';
import { AddButton } from '../../buttons/add/add-button';

import { useDispatch, useSelector } from '../../../services/store';
import { selectCurrentShiftId } from '../../../services/slices/shift/slice';
import { getLastTeamShift } from '../../../services/slices/shift/actions';

export const Timesheet = () => {
  const dispatch = useDispatch();
  const currentShiftId = useSelector(selectCurrentShiftId);

  useEffect(() => {
    dispatch(getLastTeamShift());
  }, []);

  return (
    <Layout>
      <PageTitle title="ТАБЕЛЬ" />
      {currentShiftId ? (
        <>
          <ShiftInfo />
          <TeamProfessionList />
          <UserShiftList shiftId={currentShiftId} />
        </>
      ) : (
        <div className={styles.wrapper__button}>
          <AddButton label="Создать смену" actionType="shift" />
        </div>
      )}
    </Layout>
  );
};
