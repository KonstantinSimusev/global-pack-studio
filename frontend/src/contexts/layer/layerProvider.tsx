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
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  return (
    <LayerContext.Provider
      value={{
        isOpenOverlay,
        isOpenMenu,
        isOpenModal,
        isLoginModalOpen,
        isRegisterModalOpen,
        isSuccessModalOpen,
        isErrorModalOpen,
        isAuth,
        isLoader,
        setIsOpenOverlay,
        setIsOpenMenu,
        setIsOpenModal,
        setIsLoginModalOpen,
        setIsRegisterModalOpen,
        setIsSuccessModalOpen,
        setIsErrorModalOpen,
        setIsAuth,
        setIsLoader,
      }}
    >
      {children}
    </LayerContext.Provider>
  );
};
