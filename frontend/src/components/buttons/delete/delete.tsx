import styles from './delete.module.css';

import { useContext } from 'react';
import { DeleteIcon } from '../../icons/delete/delete';
import { LayerContext } from '../../../contexts/layer/layerContext';

export const DeleteButton = () => {
  const { setIsOpenOverlay } = useContext(LayerContext);

  const handleClick = () => {
    setIsOpenOverlay(true);
  };

  return (
    <button className={styles.container} type="button" onClick={handleClick}>
      <DeleteIcon />
    </button>
  );
};
