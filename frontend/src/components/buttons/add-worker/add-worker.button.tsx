import styles from './add-worker.button.module.css';

import { useContext } from 'react';
import { LayerContext } from '../../../contexts/layer/layerContext';

export const AddWorkerButton = () => {
  const { setIsOpenOverlay, setIsAddWorkerOpenModall } =
    useContext(LayerContext);

  const handleClick = () => {
    setIsOpenOverlay(true);
    setIsAddWorkerOpenModall(true);
  };

  return (
    <button className={styles.container} type="button" onClick={handleClick}>
      Добавить работника
    </button>
  );
};
