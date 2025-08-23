import { createContext } from 'react';

interface ILayerContextValue {
  isOpenOverlay: boolean;
  isOpenMenu: boolean;
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  isOpenModal: boolean;
  setIsOpenOverlay: (value: boolean) => void;
  setIsOpenMenu: (value: boolean) => void;
  setIsOpenModal: (value: boolean) => void;
  setIsLoginModalOpen: (value: boolean) => void;
  setIsRegisterModalOpen: (value: boolean) => void;
}

export const LayerContext = createContext<ILayerContextValue>({
  isOpenOverlay: false,
  isOpenMenu: false,
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isOpenModal: false,
  setIsOpenOverlay: () => {},
  setIsOpenMenu: () => {},
  setIsOpenModal: () => {},
  setIsLoginModalOpen: () => {},
  setIsRegisterModalOpen: () => {},
});

