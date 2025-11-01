import styles from './profession-list.module.css';

import { useSelector } from '../../services/store';
import { selectUsersShifts } from '../../services/slices/user-shift/slice';
import { getProfessionsWithCounts, getTotal } from '../../utils/utils';

export const TeamProfessionList = () => {
  const usersShifts = useSelector(selectUsersShifts);
  const list = getProfessionsWithCounts(usersShifts);
  const total = getTotal(usersShifts);

  return (
    <>
      {list.length > 0 ? (
        <ul className={styles.list}>
          <div className={styles.header}>
            <span>Профессия</span>
            <span>Факт</span>
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
          <div className={styles.footer}>
            <span>Итого работников</span>
            <span>{total}</span>
          </div>
        </ul>
      ) : (
        <div>Данных нет</div>
      )}
    </>
  );
};
