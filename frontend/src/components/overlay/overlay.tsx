import styles from './overlay.module.css';

import { useContext } from 'react';
import { LayerContext } from '../../contexts/layer/layerContext';
import { useEscapeHandler } from '../../hooks/useEscapeHandler';
export const Overlay = () => {
  const {
    isOpenOverlay,
    isOpenMenu,
    isLoginModalOpen,
    isLogoutOpenModal,
    isAddWorkerOpenModall,
    isAddShiftOpenModall,
    isDeleteOpenModall,
    setIsOpenOverlay,
    setIsOpenMenu,
    setIsLoginModalOpen,
    setIsLogoutOpenModal,
    setIsAddWorkerOpenModall,
    setIsAddShiftOpenModall,
    setIsDeleteOpenModall,
  } = useContext(LayerContext);

  useEscapeHandler(() => {
    if (isOpenOverlay) {
      setIsOpenOverlay(false);
    }

    if (isOpenMenu) {
      setIsOpenMenu(false);
    }

    if (isLoginModalOpen) {
      setIsLoginModalOpen(false);
    }

    if (isLogoutOpenModal) {
      setIsLogoutOpenModal(false);
    }

    if (isAddWorkerOpenModall) {
      setIsAddWorkerOpenModall(false);
    }

    if (isAddShiftOpenModall) {
      setIsAddShiftOpenModall(false);
    }

    if (isDeleteOpenModall) {
      setIsDeleteOpenModall(false);
    }
  });

  const handleClick = (event: React.MouseEvent) => {
    // Проверяем, был ли клик по самому оверлею
    if (event.target === event.currentTarget) {
      setIsOpenOverlay(false);
      setIsOpenMenu(false);
      setIsLoginModalOpen(false);
      setIsLogoutOpenModal(false);
      setIsAddWorkerOpenModall(false);
      setIsAddShiftOpenModall(false);
      setIsDeleteOpenModall(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={handleClick} tabIndex={-1}></div>
  );
};
