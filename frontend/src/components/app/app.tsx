import styles from './app.module.css';

// import { useState } from 'react';

import { Switch } from '../switch/switch';
import { Header } from '../header/header';

// const initialData = {
//   date: '12 августа 2025 года',
//   shifty: 2,
//   team: 3
// }

const App = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Switch />
      {/* <Cover {...initialData} /> */}
    </div>
  );
};

export default App;
