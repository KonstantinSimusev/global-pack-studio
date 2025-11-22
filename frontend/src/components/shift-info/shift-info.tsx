import styles from './shift-info.module.css';

import { AddButton } from '../buttons/add/add-button';
import { InfoBlock } from '../ui/info-block/info-block';

import { useSelector } from '../../services/store';
import { selectCurrentShift } from '../../services/slices/shift/slice';

import { formatDate } from '../../utils/utils';

export const ShiftInfo = () => {
  const lastShift = useSelector(selectCurrentShift);
  const path = window.location.pathname;

  return (
    <>
      {lastShift ? (
        <div className={styles.container}>
          <InfoBlock title={'Дата'} text={formatDate(lastShift.date)} />
          <InfoBlock
            title={'№ смены'}
            text={`Смена ${lastShift.shiftNumber}`}
          />
          <InfoBlock
            title={'№ бригады'}
            text={`Бригада ${lastShift.teamNumber}`}
          />
          {path === '/timesheet' && (
            <div className={styles.wrapper__button}>
              <AddButton label={'Создать смену'} actionType="shift" />
            </div>
          )}
        </div>
      ) : (
        <span className={styles.text__empty}>
          Пожалуйста, создайте смену...
        </span>
      )}
    </>
  );
};
