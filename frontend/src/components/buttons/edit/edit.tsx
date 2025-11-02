import styles from './edit.module.css';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { EditIcon } from '../../icons/edit/edit';
import { LayerContext } from '../../../contexts/layer/layerContext';

interface IEditButtonProps {
  id?: string;
  label?: string;
  iconWidth?: number | string;
  iconHeight?: number | string;
  actionType: 'worker' | 'shift'; // можно добавить другие типы
  onOpen?: () => void; // кастомный обработчик
}

export const EditButton = ({
  id,
  label,
  iconWidth,
  iconHeight,
  actionType,
  onOpen,
}: IEditButtonProps) => {
  if (!id) {
    return null;
  }

  const navigate = useNavigate();
  const { setIsOpenOverlay, setIsUpdateWorkerOpenModall, setSelectedId } =
    useContext(LayerContext);

  const handleClick = () => {
    switch (actionType) {
      case 'shift':
        navigate(`/timesheet/shifts/${id}`);
        break;
      case 'worker':
        setIsOpenOverlay(true);
        setIsUpdateWorkerOpenModall(true);
        setSelectedId(id);
        break;
      default:
        // кастомное действие
        onOpen?.();
    }
  };

  return (
    <button className={styles.container} type="button" onClick={handleClick}>
      {label}
      <EditIcon width={iconWidth} height={iconHeight} />
    </button>
  );
};
