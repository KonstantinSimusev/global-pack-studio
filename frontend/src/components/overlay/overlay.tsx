import styles from './overlay.module.css';
import clsx from 'clsx';

import { useContext } from 'react';
import { LayerContext } from '../../contexts/layerContext';
import { useEscapeHandler } from '../../hooks/useEscapeHandler';

export const Overlay = () => {
  const {
    isOpenOverlay,
    isOpenMenu,
    isLoginModalOpen,
    isRegisterModalOpen,
    setIsOpenOverlay,
    setIsOpenMenu,
    setIsLoginModalOpen,
    setIsRegisterModalOpen,
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
  });

  const handleClick = (event: React.MouseEvent) => {
    // Проверяем, был ли клик по самому оверлею
    if (event.target === event.currentTarget) {
      setIsOpenOverlay(false);
      setIsOpenMenu(false);
      setIsLoginModalOpen(false);
      setIsRegisterModalOpen(false);
    }
  };

  return (
    <div
      className={clsx(styles.overlay, isOpenOverlay && styles.overlay__open)}
      onClick={handleClick}
    ></div>
  );
};
