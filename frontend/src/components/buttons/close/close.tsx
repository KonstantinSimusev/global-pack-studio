import styles from './close.module.css';

import { useContext } from 'react';
import { CloseIcon } from '../../icons/close/close';
import { LayerContext } from '../../../contexts/layerContext';

export const CloseButton = () => {
  const { setIsOpenMenu, setIsOpenOverlay, setIsOpenModal } =
    useContext(LayerContext);

  const handleClick = () => {
    setIsOpenMenu(false);
    setIsOpenOverlay(false);
    setIsOpenModal(false);
  };

  return (
    <button className={styles.container} type="button" onClick={handleClick}>
      <CloseIcon />
    </button>
  );
};
