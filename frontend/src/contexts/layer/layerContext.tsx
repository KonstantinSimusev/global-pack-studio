import { createContext } from 'react';

interface ILayerContextValue {
  isOpenOverlay: boolean;
  isOpenMenu: boolean;
  isOpenModal: boolean;
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  isSuccessModalOpen: boolean;
  setIsOpenOverlay: (value: boolean) => void;
  setIsOpenMenu: (value: boolean) => void;
  setIsOpenModal: (value: boolean) => void;
  setIsLoginModalOpen: (value: boolean) => void;
  setIsRegisterModalOpen: (value: boolean) => void;
  setIsSuccessModalOpen: (value: boolean) => void;
}

export const LayerContext = createContext<ILayerContextValue>({
  isOpenOverlay: false,
  isOpenMenu: false,
  isOpenModal: false,
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isSuccessModalOpen: false,
  setIsOpenOverlay: () => {},
  setIsOpenMenu: () => {},
  setIsOpenModal: () => {},
  setIsLoginModalOpen: () => {},
  setIsRegisterModalOpen: () => {},
  setIsSuccessModalOpen: () => {},
});
