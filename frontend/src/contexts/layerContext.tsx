import { createContext, useState } from 'react';

interface ILayerContextValue {
  isOpenOverlay: boolean;
  isOpenMenu: boolean;
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  // isOpenModal: boolean;
  setIsOpenOverlay: (value: boolean) => void;
  setIsOpenMenu: (value: boolean) => void;
  setIsLoginModalOpen: (value: boolean) => void;
  setIsRegisterModalOpen: (value: boolean) => void;
  // setIsOpenModal: (value: boolean) => void;
}

interface TLayerProviderProps {
  children: React.ReactNode;
}

export const LayerContext = createContext<ILayerContextValue>({
  isOpenOverlay: false,
  isOpenMenu: false,
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  // isOpenModal: false,
  setIsOpenOverlay: () => {},
  setIsOpenMenu: () => {},
  setIsLoginModalOpen: () => {},
  setIsRegisterModalOpen: () => {},
  // setIsOpenModal: () => {},
});

export const LayerProvider = ({ children }: TLayerProviderProps) => {
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  // const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <LayerContext.Provider
      value={{
        isOpenOverlay,
        isOpenMenu,
        isLoginModalOpen,
        isRegisterModalOpen,
        // isOpenModal,
        setIsOpenOverlay,
        setIsOpenMenu,
        setIsLoginModalOpen,
        setIsRegisterModalOpen,
        // setIsOpenModal,
      }}
    >
      {children}
    </LayerContext.Provider>
  );
};
