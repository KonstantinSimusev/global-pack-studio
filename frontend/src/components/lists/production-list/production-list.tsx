import styles from './production-list.module.css';

import { EditButton } from '../../buttons/edit/edit';
import { Error } from '../../ui/error/error';
import { InfoBlock } from '../../ui/info-block/info-block';
import { useDispatch, useSelector } from '../../../services/store';
import { selectProductions } from '../../../services/slices/production/slice';
import { useEffect } from 'react';
import { getProductions } from '../../../services/slices/production/actions';
import { formatProductionUnit } from '../../../utils/utils';
import { UNITS } from '../../../utils/types';

interface IProductionProps {
  shiftId?: string;
}

export const ProductionList = ({ shiftId }: IProductionProps) => {
  const dispatch = useDispatch();
  const productions = useSelector(selectProductions);

  const sortedArray = productions
    .filter((item) => item.unit !== undefined) // исключаем элементы без unit
    .sort((a, b) => {
      return UNITS.indexOf(a.unit!) - UNITS.indexOf(b.unit!);
    });

  if (!shiftId) {
    return <Error />;
  }

  useEffect(() => {
    dispatch(getProductions(shiftId));
  }, []);

  return (
    <ul className={styles.container}>
      {sortedArray.length > 0 ? (
        sortedArray.map((item) => (
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

            <InfoBlock
              title={'Оборудование в цехе'}
              text={formatProductionUnit(item.unit)}
            />
            <InfoBlock
              title={'Производство за смену'}
              text={`${item.count} рул`}
            />
          </li>
        ))
      ) : (
        <Error />
      )}
    </ul>
  );
};
