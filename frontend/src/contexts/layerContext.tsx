import { createContext, useState } from 'react';

interface ILayerContextValue {
  isOpenOverlay: boolean;
  isOpenMenu: boolean;
  isOpenModal: boolean;
  setIsOpenOverlay: (value: boolean) => void;
  setIsOpenMenu: (value: boolean) => void;
  setIsOpenModal: (value: boolean) => void;
}

interface TLayerProviderProps {
  children: React.ReactNode;
}

export const LayerContext = createContext<ILayerContextValue>({
  isOpenOverlay: false,
  isOpenMenu: false,
  isOpenModal: false,
  setIsOpenOverlay: () => {},
  setIsOpenMenu: () => {},
  setIsOpenModal: () => {},
});

export const LayerProvider = ({ children }: TLayerProviderProps) => {
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <LayerContext.Provider
      value={{
        isOpenOverlay,
        isOpenMenu,
        isOpenModal,
        setIsOpenOverlay,
        setIsOpenMenu,
        setIsOpenModal,
      }}
    >
      {children}
    </LayerContext.Provider>
  );
};
