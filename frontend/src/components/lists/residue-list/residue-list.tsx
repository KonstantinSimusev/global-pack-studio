import styles from './residue-list.module.css';

import { EditButton } from '../../buttons/edit/edit';

export const ResidueList = () => {
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
      name: 'АНГЦ + АНО + АИ',
      total: 0,
    },
    {
      id: '3',
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
              actionType="residue"
              iconWidth={30}
              iconHeight={30}
            />
          </div>

          <div className={styles.wrapper}>
            <span className={styles.title}>Агрегат</span>
            <span className={styles.text}>{item.name}</span>
          </div>

          <div className={styles.wrapper}>
            <span className={styles.title}>Остаток, рул</span>
            <span className={styles.text}>{item.total}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
