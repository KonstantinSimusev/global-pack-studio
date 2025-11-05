import { createContext } from 'react';

interface ILayerContextValue {
  isOpenOverlay: boolean;
  isOpenMenu: boolean;
  isOpenModal: boolean;
  isLoginModalOpen: boolean;
  isLogoutOpenModal: boolean;
  isAddWorkerOpenModall: boolean;
  isUpdateWorkerOpenModall: boolean;
  isAddShiftOpenModall: boolean;
  isDeleteOpenModall: boolean;
  isUserShiftInfoOpenModal: boolean;
  isCookie: boolean;
  selectedId: string;
  selectedScrollPosition: number;
  setIsOpenOverlay: (value: boolean) => void;
  setIsOpenMenu: (value: boolean) => void;
  setIsOpenModal: (value: boolean) => void;
  setIsLoginModalOpen: (value: boolean) => void;
  setIsLogoutOpenModal: (value: boolean) => void;
  setIsAddWorkerOpenModall: (value: boolean) => void;
  setIsUpdateWorkerOpenModall: (value: boolean) => void;
  setIsAddShiftOpenModall: (value: boolean) => void;
  setIsDeleteOpenModall: (value: boolean) => void;
  setIsUserShiftInfoOpenModal: (value: boolean) => void;
  setIsCookie: (value: boolean) => void;
  setSelectedId: (value: string) => void;
  setSelectedScrollPosition: (value: number) => void;
}

export const LayerContext = createContext<ILayerContextValue>({
  isOpenOverlay: false,
  isOpenMenu: false,
  isOpenModal: false,
  isLoginModalOpen: false,
  isLogoutOpenModal: false,
  isAddWorkerOpenModall: false,
  isUpdateWorkerOpenModall: false,
  isAddShiftOpenModall: false,
  isDeleteOpenModall: false,
  isUserShiftInfoOpenModal: false,
  isCookie: false,
  selectedId: '',
  selectedScrollPosition: 0,
  setIsOpenOverlay: () => {},
  setIsOpenMenu: () => {},
  setIsOpenModal: () => {},
  setIsLoginModalOpen: () => {},
  setIsLogoutOpenModal: () => {},
  setIsAddWorkerOpenModall: () => {},
  setIsUpdateWorkerOpenModall: () => {},
  setIsAddShiftOpenModall: () => {},
  setIsDeleteOpenModall: () => {},
  setIsUserShiftInfoOpenModal: () => {},
  setIsCookie: () => {},
  setSelectedId: () => {},
  setSelectedScrollPosition: () => {},
});
