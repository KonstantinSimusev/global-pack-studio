import styles from './fix.module.css';

import { EditButton } from '../../buttons/edit/edit';

export const Fix = () => {
  const shift = {
    id: '1',
    date: '12 ноября 2025 г.',
    shiftNumber: 2,
    teamNumber: 3,
  };

  return (
    <main className={styles.container}>
      <li className={styles.item}>
        <div className={styles.wrapper__header}>
          <h5 className={styles.header__title}>РАСКРЕПЛЕНИЕ</h5>
          <EditButton
            id={shift.id}
            actionType="fix"
            iconWidth={30}
            iconHeight={30}
          />
        </div>

        <div className={styles.wrapper}>
          <span className={styles.title}>Дата</span>
          <span className={styles.text}>{shift.date}</span>
        </div>

        <div className={styles.wrapper}>
          <span className={styles.title}>№ смены</span>
          <span className={styles.text}>Смена {shift.shiftNumber}</span>
        </div>

        <div className={styles.wrapper}>
          <span className={styles.title}>№ бригады</span>
          <span className={styles.text}>Бригада {shift.teamNumber}</span>
        </div>
      </li>
    </main>
  );
};
