import { useEffect } from 'react';
import { selectShifts } from '../../../services/slices/shift/slice';
import { useDispatch, useSelector } from '../../../services/store';
import styles from './home.module.css';
import { getTeamShifts } from '../../../services/slices/shift/actions';
import { HomeShiftList } from '../../lists/home-shift-list/home-shift-list';

export const Home = () => {
  const dispatch = useDispatch();
  const shifts = useSelector(selectShifts);

  useEffect(() => {
    dispatch(getTeamShifts());
  }, []);
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.title}>Структурное подразделение</span>
        <span className={styles.text}>ЛПЦ-11 ПАО "ММК"</span>
      </div>
      <HomeShiftList items={shifts} />
    </div>
  );
};
