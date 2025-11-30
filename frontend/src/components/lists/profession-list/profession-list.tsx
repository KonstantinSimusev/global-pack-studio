import styles from './profession-list.module.css';

import { useSelector } from '../../../services/store';
import { selectUsersShifts } from '../../../services/slices/user-shift/slice';

import { SuccessIcon } from '../../icons/success/success';
import { AddButton } from '../../buttons/add/add-button';

export const TeamProfessionList = () => {
  const usersShifts = useSelector(selectUsersShifts);

  console.log(usersShifts);

  const total = usersShifts.filter(
    (item) => item.workPlace !== 'Не выбрано',
  ).length;

  return (
    <div className={styles.container}>
      <span className={styles.header__title}>ИНФОРМАЦИЯ О БРИГАДЕ</span>
      <div className={styles.wrapper__info}>
        <div className={styles.wrapper}>
          <span className={styles.text}>Фактическая численность</span>
          <span className={styles.count}>{usersShifts.length}</span>
        </div>
        <div className={styles.wrapper}>
          <span className={styles.text}>Отмечено работников</span>
          {total === usersShifts.length && (
            <SuccessIcon width={18} height={18} />
          )}
          <span className={styles.number}>{total}</span>
        </div>
      </div>

      <div className={styles.wrapper__button}>
        <AddButton label={'Добавить работника'} actionType="worker" />
      </div>
    </div>
  );
};
