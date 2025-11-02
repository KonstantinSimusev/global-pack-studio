import styles from './delete.module.css';

import { useContext } from 'react';
import { DeleteIcon } from '../../icons/delete/delete';
import { LayerContext } from '../../../contexts/layer/layerContext';

interface IDeleteButtonProps {
  id?: string;
  label?: string;
  iconWidth?: number | string;
  iconHeight?: number | string;
  actionType: 'worker'; // можно добавить другие типы
  onOpen?: () => void; // кастомный обработчик
}

export const DeleteButton = ({
  id,
  label,
  iconWidth,
  iconHeight,
  actionType,
  onOpen,
}: IDeleteButtonProps) => {
  if (!id) {
    return null;
  }

  const { setIsOpenOverlay, setIsDeleteOpenModall, setSelectedId } =
    useContext(LayerContext);

  const handleClick = () => {
    switch (actionType) {
      case 'worker':
        setIsOpenOverlay(true);
        setIsDeleteOpenModall(true);
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
      <DeleteIcon width={iconWidth} height={iconHeight} />
    </button>
  );
};
