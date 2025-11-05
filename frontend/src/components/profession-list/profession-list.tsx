import styles from './profession-list.module.css';

import { useSelector } from '../../services/store';
import { selectUsersShifts } from '../../services/slices/user-shift/slice';
import { getProfessionsWithCounts, getTotal } from '../../utils/utils';

import { ErrorIcon } from '../icons/error/error';
import { SuccessIcon } from '../icons/success/success';

export const TeamProfessionList = () => {
  const usersShifts = useSelector(selectUsersShifts);
  const list = getProfessionsWithCounts(usersShifts);
  const total = getTotal(usersShifts);

  return (
    <>
      {list.length > 0 ? (
        <ul className={styles.list}>
          <div className={styles.header}>
            <span>Фактическая численность</span>
            <span>{usersShifts.length}</span>
          </div>
          <div className={styles.footer}>
            <span className={styles.success}>
              <span>Отмечено работников</span>
              {total !== usersShifts.length && (
                <ErrorIcon width={30} height={30} />
              )}
              {total === usersShifts.length && (
                <SuccessIcon width={30} height={30} />
              )}
            </span>
            <span className={styles.wrapper__total}>
              <span className={styles.number}>{total}</span>
            </span>
          </div>
          {list.map((item, index) => (
            <li
              key={index}
              className={styles.item}
              style={index === 1 || index === 3 ? { marginBottom: '20px' } : {}}
            >
              {/* <span>{String(index + 1).padStart(2, '0')}</span> */}
              <span>{item.profession}</span>
              <span>{item.count}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div>Данных нет</div>
      )}
    </>
  );
};
