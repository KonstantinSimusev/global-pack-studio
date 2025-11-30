import styles from './timesheet.module.css';

import { useEffect } from 'react';

import { Layout } from '../../ui/layout/layout';
import { PageTitle } from '../../ui/page-title/page-title';
import { ShiftInfo } from '../../shift-info/shift-info';
import { TeamProfessionList } from '../../lists/profession-list/profession-list';
import { UserShiftList } from '../../lists/user-shift-list/user-shift-list';
import { AddButton } from '../../buttons/add/add-button';

import { useDispatch, useSelector } from '../../../services/store';
import {
  selectCurrentShift,
  selectCurrentShiftId,
} from '../../../services/slices/shift/slice';
import { getLastTeamShift } from '../../../services/slices/shift/actions';

export const Timesheet = () => {
  const dispatch = useDispatch();
  const lastShift = useSelector(selectCurrentShift);
  const currentShiftId = useSelector(selectCurrentShiftId);

  // Проверяем, нужно ли показывать смену
  const shouldShowShift = () => {
    if (!lastShift || !lastShift.date) return false;

    const today = new Date();
    const lastShiftDate = new Date(lastShift.date);

    // Устанавливаем время на 00:00:00 для корректного сравнения дат
    today.setHours(0, 0, 0, 0);
    lastShiftDate.setHours(0, 0, 0, 0);

    // Разница в днях между текущей датой и датой последней смены
    // today - lastShiftDate: положительное число = прошло дней, отрицательное = в будущем
    const diffTime = today.getTime() - lastShiftDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    /*
     Условия отображения:
     - если последняя смена сегодня (diffDays = 0) → показываем
     - если последняя смена была вчера (diffDays = 1) → показываем
     - если последняя смена будет завтра (diffDays = -1) → показываем (сегодня меньше на 1 день)
     - во всех остальных случаях (≥2 дня назад или ≥2 дня вперёд) → не показываем
    */
    return diffDays === 0 || diffDays === 1 || diffDays === -1;
  };

  useEffect(() => {
    dispatch(getLastTeamShift());
  }, []);

  return (
    <Layout>
      <PageTitle title="ТАБЕЛЬ" />

      {currentShiftId && lastShift && shouldShowShift() ? (
        <>
          <ShiftInfo
            date={lastShift.date}
            shiftNumber={lastShift.shiftNumber}
            teamNumber={lastShift.teamNumber}
          />
          <TeamProfessionList />
          <UserShiftList shiftId={currentShiftId} />
        </>
      ) : (
        <div className={styles.wrapper__button}>
          <AddButton label="Создать смену" actionType="shift" />
        </div>
      )}
    </Layout>
  );
};
