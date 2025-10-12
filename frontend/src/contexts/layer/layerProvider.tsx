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
  const [isAddWorkerOpenModall, setIsAddWorkerOpenModall] = useState(false);
  const [isAddShiftOpenModall, setIsAddShiftOpenModall] = useState(false);
  const [isCookie, setIsCookie] = useState(false);

  return (
    <LayerContext.Provider
      value={{
        isOpenOverlay,
        isOpenMenu,
        isOpenModal,
        isLoginModalOpen,
        isLogoutOpenModal,
        isAddWorkerOpenModall,
        isAddShiftOpenModall,
        isCookie,
        setIsOpenOverlay,
        setIsOpenMenu,
        setIsOpenModal,
        setIsLoginModalOpen,
        setIsLogoutOpenModal,
        setIsAddWorkerOpenModall,
        setIsAddShiftOpenModall,
        setIsCookie,
      }}
    >
      {children}
    </LayerContext.Provider>
  );
};
