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
  actionType:
    | 'home'
    | 'timesheet'
    | 'production'
    | 'shipment'
    | 'pack'
    | 'fix'
    | 'worker';
}

export const EditButton = ({
  id,
  label,
  iconWidth,
  iconHeight,
  actionType,
}: IEditButtonProps) => {
  if (!id) {
    return null;
  }

  const navigate = useNavigate();
  const { setIsOpenOverlay, setIsUpdateWorkerOpenModall, setSelectedId } =
    useContext(LayerContext);

  const handleClick = () => {
    switch (actionType) {
      case 'timesheet':
        navigate(`/timesheet/shifts/${id}`);
        window.scrollTo(0, 0);
        break;
      case 'production':
        setIsOpenOverlay(true);
        break;
      case 'shipment':
        setIsOpenOverlay(true);
        break;
      case 'pack':
        setIsOpenOverlay(true);
        break;
      case 'fix':
        setIsOpenOverlay(true);
        break;
      case 'worker':
        setIsOpenOverlay(true);
        setIsUpdateWorkerOpenModall(true);
        setSelectedId(id);
        break;
      default:
        console.warn(`Неизвестный actionType: ${actionType}`, { id });
        break;
    }
  };

  return (
    <button className={styles.container} type="button" onClick={handleClick}>
      {label}
      <EditIcon width={iconWidth} height={iconHeight} />
    </button>
  );
};
