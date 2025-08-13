import styles from "./app.module.css";

// import { Header } from '../header/header';
// import { Cover } from '../cover/cover';

// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import gpsLogo from '/icon.svg';

// const initialData = {
//   date: '12 августа 2025 года',
//   shifty: 2,
//   team: 3
// }

const App = () => {
  // const [count, setCount] = useState(0);

  return (
    <div className={styles.container}>
      <br />
      <p className={styles.title_m}>Global Pack Studio</p>
      <br />
      <p className={styles.title_c}>Global Pack Studio</p>
      <br />
      <p className={styles.title_b}>Global Pack Studio</p>
      {/* <Header />
      <Cover {...initialData} /> */}
    </div>
  );
};

export default App;
