import { useMemo, useState } from 'react';
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
  const [isUpdateWorkerOpenModall, setIsUpdateWorkerOpenModall] =
    useState(false);
  const [isAddShiftOpenModall, setIsAddShiftOpenModall] = useState(false);
  const [isDeleteOpenModall, setIsDeleteOpenModall] = useState(false);
  const [isUserShiftInfoOpenModal, setIsUserShiftInfoOpenModal] =
    useState(false);
  const [isCookie, setIsCookie] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [selectedScrollPosition, setSelectedScrollPosition] = useState(0);
  const [selectedButtonActionType, setSelectedButtonActionType] = useState('');

  // Мемоизируем значение контекста
  const value = useMemo(
    () => ({
      isOpenOverlay,
      isOpenMenu,
      isOpenModal,
      isLoginModalOpen,
      isLogoutOpenModal,
      isAddWorkerOpenModall,
      isUpdateWorkerOpenModall,
      isAddShiftOpenModall,
      isDeleteOpenModall,
      isUserShiftInfoOpenModal,
      isCookie,
      selectedId,
      selectedScrollPosition,
      selectedButtonActionType,
      setIsOpenOverlay,
      setIsOpenMenu,
      setIsOpenModal,
      setIsLoginModalOpen,
      setIsLogoutOpenModal,
      setIsAddWorkerOpenModall,
      setIsUpdateWorkerOpenModall,
      setIsAddShiftOpenModall,
      setIsDeleteOpenModall,
      setIsUserShiftInfoOpenModal,
      setIsCookie,
      setSelectedId,
      setSelectedScrollPosition,
      setSelectedButtonActionType,
    }),
    [
      isOpenOverlay,
      isOpenMenu,
      isOpenModal,
      isLoginModalOpen,
      isLogoutOpenModal,
      isAddWorkerOpenModall,
      isUpdateWorkerOpenModall,
      isAddShiftOpenModall,
      isDeleteOpenModall,
      isCookie,
      selectedId,
      selectedScrollPosition,
      selectedButtonActionType,
    ],
  );

  return (
    <LayerContext.Provider value={value}>{children}</LayerContext.Provider>
  );
};
