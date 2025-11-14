import styles from './home-shift-list.module.css';

import { formatDate } from '../../../utils/utils';
import { useNavigate } from 'react-router-dom';

type TShiftListProps = {
  items: { id?: string; date: Date; shiftNumber: number; teamNumber: number }[];
};

export const HomeShiftList = ({ items }: TShiftListProps) => {
  const navigate = useNavigate();
  const currentDay = new Date();
  const currentMonth = currentDay.toLocaleString('ru', { month: 'long' });

  const handleClick = (id: string) => {
    if (!id) {
      return null;
    }
    navigate(`/home/shifts/${id}`);
  };

  return (
    <>
      {items.length > 0 ? (
        <ul className={styles.list}>
          {items.map((item) => (
            <li
              key={item.id}
              className={styles.item}
              onClick={() => handleClick(item.id ?? '')}
            >
              <span className={styles.date}>{formatDate(item.date)}</span>
              <span className={styles.text}>Смена {item.shiftNumber}</span>
              <span className={styles.text}>Бригада {item.teamNumber}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div>За {currentMonth} смен нет</div>
      )}
    </>
  );
};
