import styles from './modal.module.css';
import clsx from 'clsx';

import { useContext } from 'react';
import { CloseButton } from '../buttons/close/close';
import { LayerContext } from '../../contexts/layerContext';

interface TModalProps {
  children?: React.ReactNode;
}

export const Modal = ({ children }: TModalProps) => {
  const { isOpenModal } = useContext(LayerContext);

  return (
    <div className={clsx(styles.container, isOpenModal && styles.modal__open)}>
      <CloseButton />
      {children}
    </div>
  );
};
