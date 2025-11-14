import styles from './home-shift.module.css';

import { BackButton } from '../../buttons/back/back';
import { ProductionChart } from '../../charts/production-chart/production-chart';

export const HomeShift = () => {
  return (
    <div className={styles.container}>
      <BackButton actionType="home" />
      <ProductionChart />
    </div>
  );
};
