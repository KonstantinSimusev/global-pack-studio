import styles from './timesheet.module.css';

import { AddButton } from '../../buttons/add/add-button';
import { ShiftList } from '../../lists/shift-list/shift-list';

export const Timesheet = () => {
  return (
    <main className={styles.container}>
      <AddButton actionType="shift" />
      <ShiftList />
    </main>
  );
};
