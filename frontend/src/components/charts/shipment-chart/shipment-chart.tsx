import styles from './shipment-chart.module.css';

import { useEffect } from 'react';

import { Error } from '../../ui/error/error';
import { Border } from '../../ui/border/border';

import { useDispatch, useSelector } from '../../../services/store';
import { selectShipments } from '../../../services/slices/shipment/slice';
import { getShipments } from '../../../services/slices/shipment/actions';

import { extractNumber, getCount } from '../../../utils/utils';
import { IUserShift } from '../../../utils/api.interface';

interface IProductionChartProps {
  shiftId?: string;
  list?: IUserShift[];
}

export const ShipmentChart = ({ shiftId }: IProductionChartProps) => {
  const dispatch = useDispatch();

  const shipments = useSelector(selectShipments);

  const total = shipments
    .filter((item) => item.location === '2 ОЧЕРЕДЬ')
    .reduce((sum, item) => sum + item.count, 0);

  const getMaxCount = () => {
    if (shipments.length === 0) return 0; // или null, в зависимости от логики
    return Math.max(...shipments.map((item) => item.count));
  };

  const MAX_VALUE = getMaxCount() + 16;

  // Сортировка исходного массива
  const sortedArray = [...shipments].sort((a, b) => {
    const numA = extractNumber(a.railway ?? '');
    const numB = extractNumber(b.railway ?? '');
    return numA - numB;
  });

  useEffect(() => {
    if (shiftId) {
      dispatch(getShipments(shiftId));
    }
  }, [shiftId]);

  return (
    <div className={styles.container}>
      {!shiftId ? (
        <Error />
      ) : (
        <>
          <div className={styles.wrapper__header}>
            <span className={styles.location}>ОТГРУЗКА</span>
            <span className={styles.wrapper__status}>
              данные на начало смены
            </span>
          </div>
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
                  <span className={styles.title}>{item.railway}</span>
                </li>
              );
            })}
          </ul>

          <div className={styles.wrapper__count}>
            <div className={styles.wrapper__footer}>
              <span className={styles.total__size}>Тупик 6 + Тупик 7:</span>
              <span className={styles.total__sizel}>{total} ваг</span>
            </div>

            <div className={styles.wrapper__footer}>
              <span className={styles.total__size}>Итого за смену:</span>
              <span className={styles.total__size}>
                {getCount(shipments)} ваг
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
