import styles from './home.module.css';

// import { useEffect } from 'react';

import { useSelector } from '../../../services/store';
import { selectUser } from '../../../services/slices/auth/slice';
// import { selectWorkers } from '../../../services/slices/user/slice';
// import { getWorkers } from '../../../services/slices/user/actions';

export const Home = () => {
  const user = useSelector(selectUser);
  // const dispatch = useDispatch();
  // const workers = useSelector(selectWorkers);

  // useEffect(() => {
  // dispatch(getWorkers());
  // }, []);

  return (
    <main className={styles.container}>
      <div className={styles.shift_info}>
        <span className={styles.wrapper}>
          <span className={styles.title}>Бригада</span>
          <span className={styles.text}>№{user?.currentTeamNumber ?? '-'}</span>
        </span>
        <div className={styles.master}>
          <span className={styles.wrapper}>
            <span className={styles.title}>Руководитель</span>
            <span className={styles.text}>
              <span className={styles.text}>{user?.lastName ?? '-'} </span>
              <span className={styles.text}>{user?.firstName ?? ''} </span>
              <span className={styles.text}>{user?.patronymic ?? ''}</span>
            </span>
          </span>
          <span className={styles.wrapper}>
            <span className={styles.title}>Должность</span>
            <span className={styles.text}>{user?.profession ?? '-'}</span>
          </span>
        </div>
      </div>

      <div>
        {/* {workers.map((worker, index) => (
          <div key={index}>
            {index + 1}. {worker.name} - {worker.teamNumber} - {worker.count}
          </div>
        ))} */}
      </div>
    </main>
  );
};
