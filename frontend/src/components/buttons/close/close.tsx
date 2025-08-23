import styles from './close.module.css';

import { useContext } from 'react';
import { CloseIcon } from '../../icons/close/close';
import { LayerContext } from '../../../contexts/layer/layerContext';

export const CloseButton = () => {
  const {
    setIsOpenMenu,
    setIsOpenOverlay,
    setIsLoginModalOpen,
    setIsRegisterModalOpen,
    setIsSuccessModalOpen,
  } = useContext(LayerContext);

  const handleClick = () => {
    setIsOpenMenu(false);
    setIsOpenOverlay(false);
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setIsSuccessModalOpen(false);
  };

  return (
    <button className={styles.container} type="button" onClick={handleClick}>
      <CloseIcon />
    </button>
  );
};
