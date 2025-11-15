import styles from './pack-list.module.css';

import { EditButton } from '../../buttons/edit/edit';

export const PackList = () => {
  const list = [
    {
      id: '1',
      location: '1 ОЧЕРЕДЬ',
      name: 'СТАН-2000',
      total: 0,
    },
    {
      id: '2',
      location: '2 ОЧЕРЕДЬ',
      name: 'ЛУМ',
      total: 0,
    },
    {
      id: '3',
      location: '2 ОЧЕРЕДЬ',
      name: 'Ручная упаковка',
      total: 0,
    },
    {
      id: '4',
      location: '3 ОЧЕРЕДЬ',
      name: 'АНГЦ-3',
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
              actionType="pack"
              iconWidth={30}
              iconHeight={30}
            />
          </div>

          <div className={styles.wrapper}>
            <span className={styles.title}>Участок</span>
            <span className={styles.text}>{item.name}</span>
          </div>

          <div className={styles.wrapper}>
            <span className={styles.title}>Упаковано за смену, рул</span>
            <span className={styles.text}>{item.total}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
