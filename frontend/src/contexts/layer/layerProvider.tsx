import { useState } from 'react';
import { LayerContext } from './layerContext';

interface TLayerProviderProps {
  children: React.ReactNode;
}

export const LayerProvider = ({ children }: TLayerProviderProps) => {
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogoutOpenModal, setIsLogoutOpenModal] = useState(false);
  const [isCookie, setIsCookie] = useState(false);

  return (
    <LayerContext.Provider
      value={{
        isOpenOverlay,
        isOpenMenu,
        isOpenModal,
        isLoginModalOpen,
        isLogoutOpenModal,
        isCookie,
        setIsOpenOverlay,
        setIsOpenMenu,
        setIsOpenModal,
        setIsLoginModalOpen,
        setIsLogoutOpenModal,
        setIsCookie,
      }}
    >
      {children}
    </LayerContext.Provider>
  );
};
