import styles from './timesheet-shift.module.css';

import { BackButton } from '../../buttons/back/back';
import { AddButton } from '../../buttons/add/add-button';
import { TeamProfessionList } from '../../lists/profession-list/profession-list';
import { UserShiftList } from '../../lists/user-shift-list/user-shift-list';

export const TimesheetShift = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <BackButton actionType="timesheet" />
        <AddButton actionType="worker" />
      </div>
      <TeamProfessionList />
      <UserShiftList />
    </div>
  );
};
