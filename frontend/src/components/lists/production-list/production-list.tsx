import styles from './production-list.module.css';

import { EditButton } from '../../buttons/edit/edit';

export const ProductionList = () => {
  const list = [
    {
      id: '1',
      location: '1 ОЧЕРЕДЬ',
      name: 'СТАН-2000',
      total: 0,
      remainder: 0,
    },
    {
      id: '2',
      location: '2 ОЧЕРЕДЬ',
      name: 'АНГЦ',
      total: 0,
      remainder: 0,
    },
    {
      id: '3',
      location: '2 ОЧЕРЕДЬ',
      name: 'АНО-ГЦ',
      total: 0,
      remainder: 0,
    },
    {
      id: '4',
      location: '2 ОЧЕРЕДЬ',
      name: 'АИ',
      total: 0,
      remainder: 0,
    },
    {
      id: '5',
      location: '3 ОЧЕРЕДЬ',
      name: 'АНГЦ-3',
      total: 0,
      remainder: 0,
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
              actionType="production"
              iconWidth={30}
              iconHeight={30}
            />
          </div>

          <div className={styles.wrapper}>
            <span className={styles.title}>Агрегат</span>
            <span className={styles.text}>{item.name}</span>
          </div>

          <div className={styles.wrapper}>
            <span className={styles.title}>Производство за смену</span>
            <span className={styles.text}>{item.total} рул</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
