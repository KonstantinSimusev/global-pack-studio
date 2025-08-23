import styles from './overlay.module.css';

import { useContext } from 'react';
import { LayerContext } from '../../contexts/layer/layerContext';
import { useEscapeHandler } from '../../hooks/useEscapeHandler';

export const Overlay = () => {
  const {
    isOpenOverlay,
    isOpenMenu,
    isLoginModalOpen,
    isRegisterModalOpen,
    isSuccessModalOpen,
    isErrorModalOpen,
    setIsOpenOverlay,
    setIsOpenMenu,
    setIsLoginModalOpen,
    setIsRegisterModalOpen,
    setIsSuccessModalOpen,
    setIsErrorModalOpen,
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

    if (isRegisterModalOpen) {
      setIsRegisterModalOpen(false);
    }

    if (isSuccessModalOpen) {
      setIsSuccessModalOpen(false);
    }

    if (isErrorModalOpen) {
      setIsErrorModalOpen(false);
    }
  });

  const handleClick = (event: React.MouseEvent) => {
    // Проверяем, был ли клик по самому оверлею
    if (event.target === event.currentTarget) {
      setIsOpenOverlay(false);
      setIsOpenMenu(false);
      setIsLoginModalOpen(false);
      setIsRegisterModalOpen(false);
      setIsSuccessModalOpen(false);
      setIsErrorModalOpen(false);
    }
  };

  return <div className={styles.overlay} onClick={handleClick}></div>;
};
