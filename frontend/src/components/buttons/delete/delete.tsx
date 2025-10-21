import styles from './delete.module.css';

import { useContext } from 'react';
import { DeleteIcon } from '../../icons/delete/delete';
import { LayerContext } from '../../../contexts/layer/layerContext';

export const DeleteButton = ({ id }: { id?: string }) => {
  if (!id) {
    return null;
  }

  const { setIsOpenOverlay, setIsDeleteOpenModall, setSelectedId } =
    useContext(LayerContext);

  const handleClick = () => {
    setIsOpenOverlay(true);
    setIsDeleteOpenModall(true);
    setSelectedId(id);
  };

  return (
    <button className={styles.container} type="button" onClick={handleClick}>
      <DeleteIcon />
    </button>
  );
};
