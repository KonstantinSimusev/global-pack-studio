import styles from './shift-list.module.css';

import { formatDate } from '../../utils/utils';
import { EditButton } from '../buttons/edit/edit';

type TShiftListProps = {
  items: { id?: string; date: Date; shiftNumber: number; teamNumber: number }[];
};

export const ShiftList = ({ items }: TShiftListProps) => {

  const currentDay = new Date();
  const currentMonth = currentDay.toLocaleString('ru', { month: 'long' });

  return (
    <>
      {items.length > 0 ? (
        <ul className={styles.list}>
          {items.map((item, index) => (
            <li key={item.id} className={styles.item}>
              <div className={styles.wrapper__header}>
                <span className={styles.index}>
                  {String(items.length - index).padStart(2, '0')}
                </span>
                <div className={styles.wrapper__info}>
                  <span className={styles.shift__number}>
                    Смена {item.shiftNumber}
                  </span>
                  <span className={styles.date}>{formatDate(item.date)}</span>
                </div>
              </div>
              <div className={styles.wrapper__button}>
                <EditButton id={item.id} actionType="shift" />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>За {currentMonth} смен нет</div>
      )}
    </>
  );
};
