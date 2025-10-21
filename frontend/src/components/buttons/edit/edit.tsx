import styles from './edit.module.css';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { EditIcon } from '../../icons/edit/edit';

import { LayerContext } from '../../../contexts/layer/layerContext';

export const EditButton = ({ id }: { id?: string }) => {
  if (!id) {
    return null;
  }

  const { setSelectedId } = useContext(LayerContext);

  const navigate = useNavigate();

  const handleClick = () => {
    setSelectedId(id);
    navigate('/teamworkers');
  };

  return (
    <button className={styles.container} type="button" onClick={handleClick}>
      <EditIcon />
    </button>
  );
};
