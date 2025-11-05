import styles from './info-block.module.css';

import { useSelector } from 'react-redux';
import { selectCurrentUserShift } from '../../services/slices/user-shift/slice';

export const InfoBlock = () => {
  const currentUserShift = useSelector(selectCurrentUserShift);
  return (
    <span className={styles.container}>
      <span className={styles.wrapper}>
        <span className={styles.text}>
          Работник из бригады №{currentUserShift?.user?.currentTeamNumber}
        </span>
        <span className={styles.wrapper__fio}>
          <span className={styles.text}>
            {currentUserShift?.user?.lastName}{' '}
            {currentUserShift?.user?.firstName}{' '}
            {currentUserShift?.user?.patronymic}
          </span>
        </span>
        <span>добавлен в категорию:</span>
      </span>
      <span className={styles.text}>{currentUserShift?.shiftProfession}</span>
    </span>
  );
};
