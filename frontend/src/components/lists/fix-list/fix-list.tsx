import styles from './fix-list.module.css';

import { EditButton } from '../../buttons/edit/edit';

export const  FixList = () => {
  const list = [
    {
      id: '1',
      location: '1 ОЧЕРЕДЬ',
      name: '8',
      total: 0,
    },
    {
      id: '2',
      location: '2 ОЧЕРЕДЬ',
      name: '6 + 7',
      total: 0,
    },
    {
      id: '3',
      location: '3 ОЧЕРЕДЬ',
      name: '10',
      total: 0,
    },
  ];

  return (
    <ul className={styles.list}>
      {list.map((item) => (
        <li key={item.id} className={styles.item}>
          <div className={styles.wrapper__header}>
            <h5 className={styles.location}>{item.location}</h5>
            <EditButton
              id={item.id}
              actionType="fix"
              iconWidth={30}
              iconHeight={30}
            />
          </div>

          <div className={styles.wrapper}>
            <span className={styles.title}>Тупик №</span>
            <span className={styles.text}>{item.name}</span>
          </div>

          <div className={styles.wrapper}>
            <span className={styles.title}>Раскреплено за смену, ваг</span>
            <span className={styles.text}>{item.total}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
