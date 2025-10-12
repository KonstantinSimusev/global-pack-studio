import { createContext } from 'react';

interface ILayerContextValue {
  isOpenOverlay: boolean;
  isOpenMenu: boolean;
  isOpenModal: boolean;
  isLoginModalOpen: boolean;
  isLogoutOpenModal: boolean;
  isAddWorkerOpenModall: boolean;
  isAddShiftOpenModall: boolean;
  isCookie: boolean;
  setIsOpenOverlay: (value: boolean) => void;
  setIsOpenMenu: (value: boolean) => void;
  setIsOpenModal: (value: boolean) => void;
  setIsLoginModalOpen: (value: boolean) => void;
  setIsLogoutOpenModal: (value: boolean) => void;
  setIsAddWorkerOpenModall: (value: boolean) => void;
  setIsAddShiftOpenModall: (value: boolean) => void;
  setIsCookie: (value: boolean) => void;
}

export const LayerContext = createContext<ILayerContextValue>({
  isOpenOverlay: false,
  isOpenMenu: false,
  isOpenModal: false,
  isLoginModalOpen: false,
  isLogoutOpenModal: false,
  isAddWorkerOpenModall: false,
  isAddShiftOpenModall: false,
  isCookie: false,
  setIsOpenOverlay: () => {},
  setIsOpenMenu: () => {},
  setIsOpenModal: () => {},
  setIsLoginModalOpen: () => {},
  setIsLogoutOpenModal: () => {},
  setIsAddWorkerOpenModall: () => {},
  setIsAddShiftOpenModall: () => {},
  setIsCookie: () => {},
});
