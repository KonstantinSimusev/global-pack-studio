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
  const [isUpdateWorkerOpenModall, setIsUpdateWorkerOpenModall] = useState(false);
  const [isAddShiftOpenModall, setIsAddShiftOpenModall] = useState(false);
  const [isDeleteOpenModall, setIsDeleteOpenModall] = useState(false);
  const [isCookie, setIsCookie] = useState(false);
  const [selectedId, setSelectedId] = useState('');

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
      isCookie,
      selectedId,
      setIsOpenOverlay,
      setIsOpenMenu,
      setIsOpenModal,
      setIsLoginModalOpen,
      setIsLogoutOpenModal,
      setIsAddWorkerOpenModall,
      setIsUpdateWorkerOpenModall,
      setIsAddShiftOpenModall,
      setIsDeleteOpenModall,
      setIsCookie,
      setSelectedId,
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
    ],
  );

  return (
    <LayerContext.Provider value={value}>{children}</LayerContext.Provider>
  );
};
