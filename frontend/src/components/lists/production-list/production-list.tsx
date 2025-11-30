import styles from './production-list.module.css';

import { EditButton } from '../../buttons/edit/edit';
import { Error } from '../../ui/error/error';
import { InfoBlock } from '../../ui/info-block/info-block';
import { useDispatch, useSelector } from '../../../services/store';
import { selectProductions } from '../../../services/slices/production/slice';
import { useEffect } from 'react';
import { getProductions } from '../../../services/slices/production/actions';
import { formatProductionUnit } from '../../../utils/utils';
import { TLocation } from '../../../utils/types';

interface IProductionProps {
  shiftId?: string;
}

export const ProductionList = ({ shiftId }: IProductionProps) => {
  const dispatch = useDispatch();
  const productions = useSelector(selectProductions);

  const list = productions.slice().sort((a, b) => {
    // Извлекаем номер очереди (цифру в начале строки)
    const orderA = parseInt((a.location as TLocation).split(' ')[0], 10);
    const orderB = parseInt((b.location as TLocation).split(' ')[0], 10);

    // Сначала сортируем по номеру очереди
    if (orderA !== orderB) {
      return orderA - orderB;
    }

    // Если очереди одинаковые, сортируем по названию оборудования (алфавитно)
    return (a.unit as string).localeCompare(b.unit as string);
  });

  if (!shiftId) {
    return <Error />;
  }

  useEffect(() => {
    dispatch(getProductions(shiftId));
  }, []);

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

            <InfoBlock
              title={'Оборудование цеха'}
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
