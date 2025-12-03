import styles from './residue-chart.module.css';

import { useDispatch } from '../../../services/store';
import { Error } from '../../ui/error/error';
import { getCount } from '../../../utils/utils';
import { useEffect } from 'react';
import { getProductions } from '../../../services/slices/production/actions';
import { RESIDUES } from '../../../utils/types';
import { IResidue } from '../../../utils/api.interface';
import { Border } from '../../ui/border/border';

interface IChartProps {
  shiftId?: string;
}

export const ResidueChart = ({ shiftId }: IChartProps) => {
  const dispatch = useDispatch();
  // const productions = useSelector(selectProductions);
  // const residue = useSelector();
  const MAX_VALUE = 200;

  const residues = RESIDUES.map((item, index) => {
    const residue: IResidue = {
      id: index,
      location: item,
      count: 37,
    };

    return residue;
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
          <div className={styles.wrapper__header}>
            <span className={styles.location}>ОСТАТКИ</span>
            <span className={styles.wrapper__status}>
              на начало смены
            </span>
          </div>
          {getCount(residues) > 0 ? (
            <ul className={styles.chart}>
              {residues.map((item) => {
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
          ) : (
            <span className={styles.no__residues}>Всё упаковано</span>
          )}
        </>
      )}
    </div>
  );
};
