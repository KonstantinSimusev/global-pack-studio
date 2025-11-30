import styles from './home-shift.module.css';

import { BackButton } from '../../buttons/back/back';
import { ProductionChart } from '../../charts/production-chart/production-chart';
import { useParams } from 'react-router-dom';
import { ShiftInfo } from '../../shift-info/shift-info';
import { useSelector } from '../../../services/store';
import {
  selectActiveShift,
  selectFinishedShift,
} from '../../../services/slices/shift/slice';
import { Error } from '../../ui/error/error';
import { WorkerAttendanceList } from '../../lists/worker-attendance-list/worker-attendance-list';
import { Layout } from '../../ui/layout/layout';
import { InfoBlock } from '../../ui/info-block/info-block';
import { TRole } from '../../../utils/types';

export const HomeShift = () => {
  const { shiftId } = useParams();

  if (!shiftId) {
    return <Error />;
  }

  const activeShift = useSelector(selectActiveShift);
  const finishedShift = useSelector(selectFinishedShift);

  const userRole: TRole = 'MASTER';

  const currentShift =
    activeShift?.id === shiftId ? activeShift : finishedShift;

  const usersShifts = currentShift?.usersShifts;

  const userShift = usersShifts?.find(
    (userShift) => userShift.user?.role === userRole,
  );

  // Формируем полное ФИО мастера
  const masterFullName = userShift
    ? `${userShift.user?.lastName} ${userShift.user?.firstName} ${userShift.user?.patronymic}`
    : 'Нет данных...';

  // Формируем должность
  const profession = userShift ? userShift.user?.profession : 'Нет данных...';

  return (
    <Layout>
      <div className={styles.wrapper__button}>
        <BackButton actionType="home" />
      </div>
      <div className={styles.wrapper__master}>
        {masterFullName && (<>
          <InfoBlock title={'Руководитель бригады'} text={masterFullName} />
        </>
        )}
        {profession && (<>
          <InfoBlock title={'Должность'} text={profession} />
        </>
        )}
        
      </div>
      {currentShift && (
        <ShiftInfo
          date={currentShift.date}
          shiftNumber={currentShift.shiftNumber}
          teamNumber={currentShift.teamNumber}
        />
      )}

      <ProductionChart shiftId={shiftId} />
      {currentShift?.usersShifts && (
        <WorkerAttendanceList list={currentShift?.usersShifts} />
      )}
    </Layout>
  );
};
