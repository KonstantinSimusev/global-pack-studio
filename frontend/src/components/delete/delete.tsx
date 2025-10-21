import styles from './delete.module.css';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { LayerContext } from '../../contexts/layer/layerContext';
import { useDispatch, useSelector } from '../../services/store';

import {
  getTeamShifts,
  deleteShift,
} from '../../services/slices/shift/actions';
import { Spinner } from '../spinner/spinner';
import { selectIsLoading } from '../../services/slices/shift/slice';

export const Delete = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const { setIsOpenOverlay, setIsDeleteOpenModall, selectedId } =
    useContext(LayerContext);

  const handleClickDelete = async () => {
    try {
      await dispatch(deleteShift(selectedId));
      dispatch(getTeamShifts());

      // Очищаем состояние оверлеев и модальных окон
      setIsDeleteOpenModall(false);
      setIsOpenOverlay(false);

      // После удаления
      navigate('/timesheet');
    } catch (error) {
      setIsDeleteOpenModall(false);
      setIsOpenOverlay(false);
      navigate('/timesheet');
    }
  };

  const handleClickReturn = () => {
    setIsDeleteOpenModall(false);
    setIsOpenOverlay(false);
  };

  return (
    <div className={styles.container}>
      <span className={styles.wrapper__info}>
        <span className={styles.text}>Удалить смену?</span>
      </span>
      <div className={styles.spinner}>{isLoading && <Spinner />}</div>

      <div className={styles.wrapper}>
        <button
          className={styles.button__logout}
          type="button"
          onClick={handleClickDelete}
        >
          Удалить
        </button>
        <button
          className={styles.button__return}
          type="button"
          onClick={handleClickReturn}
        >
          Отменить
        </button>
      </div>
    </div>
  );
};
