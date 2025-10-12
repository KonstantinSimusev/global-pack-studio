import styles from './home.module.css';

// import { useEffect } from 'react';

// import { useDispatch, useSelector } from '../../../services/store';
// import { selectWorkers } from '../../../services/slices/user/slice';
// import { getWorkers } from '../../../services/slices/user/actions';

export const Home = () => {
  // const dispatch = useDispatch();
  // const workers = useSelector(selectWorkers);

  // useEffect(() => {
  //   dispatch(getWorkers());
  // }, []);
  
  return (
    <main className={styles.container}>
      <p>Главная страница</p>
      
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
