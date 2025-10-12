import styles from './edit.module.css';

import { useContext } from 'react';
import { EditIcon } from '../../icons/edit/edit';
import { LayerContext } from '../../../contexts/layer/layerContext';

export const EditButton = () => {
  const { setIsOpenOverlay, setIsAddShiftOpenModall } =
    useContext(LayerContext);

  const handleClick = () => {
    setIsOpenOverlay(true);
    setIsAddShiftOpenModall(true);
  };

  return (
    <button className={styles.container} type="button" onClick={handleClick}>
      <EditIcon />
    </button>
  );
};
