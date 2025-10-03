import styles from './timesheet.module.css';

import { useDispatch, useSelector } from '../../../services/store';
import { getTeamUsers } from '../../../services/slices/auth/actions';
import { selectUsers } from '../../../services/slices/auth/slice';
import { useEffect } from 'react';

export const Timesheet = () => {
  const dispatch = useDispatch();
  const teamUsers = useSelector(selectUsers);

  useEffect(() => {
    if (teamUsers.length === 0) {
      dispatch(getTeamUsers());
    }
  }, []);

  return (
    <div className={styles.container}>
      <p>Табель учета рабочего времени</p>
      <div>
        {
          teamUsers.map((user, index) => (
            <div key={user.id}>{index + 1}. {user.id}</div>
          ))
        }
      </div>
    </div>
  );
};
