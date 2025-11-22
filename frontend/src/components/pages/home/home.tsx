// import styles from './home.module.css';

import { Layout } from '../../ui/layout/layout';
import { InfoBlock } from '../../ui/info-block/info-block';
import { ProductionChart } from '../../charts/production-chart/production-chart';

export const Home = () => {
  return (
    <Layout>
      <InfoBlock
        title={'Структурное подразделение'}
        text={'ЛПЦ-11 ПАО "ММК"'}
      />
      <ProductionChart />
    </Layout>
  );
};
