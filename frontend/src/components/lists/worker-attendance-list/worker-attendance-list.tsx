import styles from './worker-attendance-list.module.css';

import { EditButton } from '../../buttons/edit/edit';
import { Error } from '../../ui/error/error';
import { IUserShift } from '../../../utils/api.interface';
// import { countProfessionsByLocation } from '../../../utils/utils';
import { WORKERS } from '../../../utils/types';

interface IListProps {
  list: IUserShift[];
}

export const WorkerAttendanceList = ({ list }: IListProps) => {
  // const workerList = countProfessionsByLocation(list);
  return (
    <div className={styles.container}>
      <span className={styles.location}>ТАБЕЛЬ</span>
      <div className={styles.table}>
        <span>Профессия</span>
        <span>1 оч</span>
        <span>2 оч</span>
        <span>3 оч</span>
        <span>ЛУМ</span>
      </div>
      <ul className={styles.wrapper__worker}>
        {WORKERS.map((item, index) => (
          <li key={index}>
            <div className={styles.table}>
              <span>{item}</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              <span>-</span>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
