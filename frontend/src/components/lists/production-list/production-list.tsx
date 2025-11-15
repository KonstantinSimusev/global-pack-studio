import styles from './production-list.module.css';

import { EditButton } from '../../buttons/edit/edit';

export const ProductionList = () => {
  const list = [
    {
      id: '1',
      location: '1 ОЧЕРЕДЬ',
      unit: 'СТАН',
      count: 0
    }
  ]
  return (
    <ul className={styles.list}>
      {list && list.length > 0 ? (
        list.map((item) => (
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
              <span className={styles.text}>{item.unit}</span>
            </div>

            <div className={styles.wrapper}>
              <span className={styles.title}>Производство за смену, рул</span>
              <span className={styles.text}>{item.count}</span>
            </div>
          </li>
        ))
      ) : (
        <span className={styles.text__info}>Нет данных для отображения...</span>
      )}
    </ul>
  );
};
