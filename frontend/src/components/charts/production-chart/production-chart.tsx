import styles from './production-chart.module.css';

export const ProductionChart = () => {
  const MAX_VALUE = 200;
  const list = [
    {
      id: '1',
      title: 'СТАН',
      total: 0,
    },
    {
      id: '2',
      title: 'АНГЦ',
      total: 173,
    },
    {
      id: '3',
      title: 'АНО',
      total: 76,
    },
    {
      id: '4',
      title: 'АИ',
      total: 13,
    },
    {
      id: '5',
      title: 'АНГЦ-3',
      total: 110,
    },
  ];

  return (
    <div className={styles.container}>
      <span className={styles.location}>ПРОИЗВОДСТВО</span>
      <ul className={styles.chart}>
        {list.map((item) => {
          const percentage = Math.round((item.total / MAX_VALUE) * 100);
          return (
            <li key={item.id} className={styles.column}>
              <span
                style={{ height: `${percentage}px` }}
                className={styles.column__height}
              >
                <span className={styles.total}>{item.total}</span>
              </span>
              <span className={styles.border}></span>
              <span className={styles.title}>{item.title}</span>
            </li>
          );
        })}
      </ul>
      <div className={styles.wrapper__common}>

      <span className={styles.common}>Итого за смену:</span>
      <span className={styles.common}>210 рул</span>
      </div>
    </div>
  );
};
