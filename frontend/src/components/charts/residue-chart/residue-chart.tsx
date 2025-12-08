import styles from './residue-chart.module.css';

import { useEffect } from 'react';

import { Error } from '../../ui/error/error';
import { Border } from '../../ui/border/border';

import { useDispatch, useSelector } from '../../../services/store';

import { selectResidues } from '../../../services/slices/residue/slice';
import { getResidues } from '../../../services/slices/residue/actions';

import { IUserShift } from '../../../utils/api.interface';

import {
  // countProfessionsByAttendance,
  // filterAndSortProfessions,
  // filterWorkers,
  getCount,
  transformResidueLocations,
  // getPackerStats,
  // transformLocations,
} from '../../../utils/utils';

interface IChartProps {
  shiftId?: string;
  list?: IUserShift[];
}

export const ResidueChart = ({ shiftId }: IChartProps) => {
  const dispatch = useDispatch();

  const residues = useSelector(selectResidues);
  const transformArray = transformResidueLocations(residues);

  const getMaxCount = () => {
    if (residues.length === 0) return 0; // или null, в зависимости от логики
    return Math.max(...residues.map((item) => item.count));
  };

  const MAX_VALUE = getMaxCount() + 50;

  useEffect(() => {
    if (shiftId) {
      dispatch(getResidues(shiftId));
    }
  }, [shiftId]);

  return (
    <div className={styles.container}>
      {!shiftId || residues.length === 0 ? (
        <Error />
      ) : (
        <>
          <div className={styles.wrapper__header}>
            <span className={styles.location}>ОСТАТКИ</span>
            <span className={styles.wrapper__status}>
              данные на начало смены
            </span>
          </div>
          <ul className={styles.chart}>
            {transformArray.map((item) => {
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
                  <span className={styles.title}>{item.location}</span>
                </li>
              );
            })}
          </ul>

          <div className={styles.wrapper__footer}>
            <span className={styles.total__size}>Итого:</span>
            <span className={styles.total__size}>{getCount(residues)} рул</span>
          </div>
        </>
      )}
    </div>
  );
};
