import styles from './edit.module.css';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { EditIcon } from '../../icons/edit/edit';
import { LayerContext } from '../../../contexts/layer/layerContext';

interface IEditButtonProps {
  id?: string;
  label?: string;
  actionType: 'worker' | 'shift'; // можно добавить другие типы
  onOpen?: () => void; // кастомный обработчик
}

export const EditButton = ({
  id,
  label,
  actionType,
  onOpen,
}: IEditButtonProps) => {
  if (!id) {
    return null;
  }

  const { setIsOpenOverlay } = useContext(LayerContext);

  const navigate = useNavigate();

  const handleClick = () => {
    
    switch (actionType) {
      case 'shift':
        navigate(`/timesheet/shifts/${id}`);
        break;
      case 'worker':
        setIsOpenOverlay(true);
        break;
      default:
        // кастомное действие
        onOpen?.();
    }
  };

  return (
    <button className={styles.container} type="button" onClick={handleClick}>
      {label}
      <EditIcon />
    </button>
  );
};
