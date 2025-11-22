import styles from './info-block.module.css';

import { useSelector } from 'react-redux';
import { selectCurrentUserShift } from '../../services/slices/user-shift/slice';

export const InfoBlock = () => {
  const currentUserShift = useSelector(selectCurrentUserShift);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.wrapper__fio}>
          <span className={styles.text}>
            {currentUserShift?.user?.lastName}{' '}
            {currentUserShift?.user?.firstName}
          </span>
          <span className={styles.text}>
            {currentUserShift?.user?.patronymic}
          </span>
        </div>
        <span className={styles.text}>
          из бригады №{currentUserShift?.user?.currentTeamNumber}
        </span>

        <span className={styles.text}>добавлен в категорию:</span>
        <span className={styles.text}>{currentUserShift?.shiftProfession}</span>
      </div>
    </div>
  );
};
