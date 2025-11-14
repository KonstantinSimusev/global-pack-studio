import styles from './info-block.module.css';

import { useSelector } from 'react-redux';
import { selectCurrentUserShift } from '../../services/slices/user-shift/slice';

export const InfoBlock = () => {
  const currentUserShift = useSelector(selectCurrentUserShift);
  return (
    <span className={styles.container}>
      <span className={styles.wrapper}>
        <span className={styles.wrapper__fio}>
          <span className={styles.text}>
            {currentUserShift?.user?.lastName}{' '}
            {currentUserShift?.user?.firstName}
          </span>
          <span className={styles.text}>
            {currentUserShift?.user?.patronymic}
          </span>
        </span>
        <span className={styles.text}>
          Бригада №{currentUserShift?.user?.currentTeamNumber}
        </span>

        <span className={styles.text}>Добавлен в категорию:</span>
        <span className={styles.text}>{currentUserShift?.shiftProfession}</span>
      </span>
    </span>
  );
};
