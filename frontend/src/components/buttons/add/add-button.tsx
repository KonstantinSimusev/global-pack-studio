import styles from './add-button.module.css';

import { useContext } from 'react';
import { LayerContext } from '../../../contexts/layer/layerContext';
import { AddIcon } from '../../icons/add/add';

interface AddButtonProps {
  label?: string;
  actionType: 'worker' | 'shift' | 'other'; // можно добавить другие типы
  onOpen?: () => void; // кастомный обработчик
}

export const AddButton = ({ label, actionType, onOpen }: AddButtonProps) => {
  const {
    setIsOpenOverlay,
    setIsAddWorkerOpenModall,
    setIsAddShiftOpenModall,
  } = useContext(LayerContext);

  const handleClick = () => {
    setIsOpenOverlay(true);

    switch (actionType) {
      case 'worker':
        setIsAddWorkerOpenModall(true);
        break;
      case 'shift':
        setIsAddShiftOpenModall(true);
        break;
      default:
        // кастомное действие
        onOpen?.();
    }
  };

  return (
    <button className={styles.container} type="button" onClick={handleClick}>
      {label}
      <AddIcon />
    </button>
  );
};
