import styles from './production-chart.module.css';

import { selectProductions } from '../../../services/slices/production/slice';
import { useDispatch, useSelector } from '../../../services/store';
import { Error } from '../../ui/error/error';
import { getCount } from '../../../utils/utils';
import { useEffect } from 'react';
import { getProductions } from '../../../services/slices/production/actions';
import { Border } from '../../ui/border/border';
import { UNITS } from '../../../utils/types';

interface IProductionChartProps {
  shiftId?: string;
}

export const ProductionChart = ({ shiftId }: IProductionChartProps) => {
  const dispatch = useDispatch();
  const productions = useSelector(selectProductions);
  const MAX_VALUE = 200;

  const sortedArray = productions
    .filter((item) => item.unit !== undefined) // исключаем элементы без unit
    .sort((a, b) => {
      return UNITS.indexOf(a.unit!) - UNITS.indexOf(b.unit!);
    });

  useEffect(() => {
    if (shiftId) {
      dispatch(getProductions(shiftId));
    }
  }, [shiftId]);

  return (
    <div className={styles.container}>
      {!shiftId ? (
        <Error />
      ) : (
        <>
          <span className={styles.location}>ПРОИЗВОДСТВО</span>
          <ul className={styles.chart}>
            {sortedArray.map((item) => {
              const percentage = Math.round((item.count / MAX_VALUE) * 100);
              return (
                <li key={item.id} className={styles.column}>
                  <span
                    style={{ height: `${percentage}px` }}
                    className={styles.column__height}
                  >
                    <span className={styles.count}>
                      {item.count > 0 ? item.count : ''}
                    </span>
                  </span>
                  <Border />
                  <span className={styles.title}>{item.unit}</span>
                </li>
              );
            })}
          </ul>
          <div className={styles.wrapper__footer}>
            <span className={styles.common}>Итого за смену:</span>
            <span className={styles.common}>{getCount(productions)} рул</span>
          </div>
        </>
      )}
    </div>
  );
};
