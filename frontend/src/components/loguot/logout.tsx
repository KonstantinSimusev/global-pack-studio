import styles from './logout.module.css';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Spinner } from '../spinner/spinner';

import { LayerContext } from '../../contexts/layer/layerContext';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/slices/auth/actions';

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setIsOpenMenu, setIsOpenOverlay, setIsLogoutOpenModal } =
    useContext(LayerContext);

  const handleClickLogout = async () => {
    try {
      // Очищаем состояние оверлеев и модальных окон
      setIsOpenOverlay(false);
      setIsLogoutOpenModal(false);

      // Диспатим действие выхода
      await dispatch(logoutUser());

      // После успешного выхода перенаправляем на главную страницу
      navigate('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      // При ошибке также закрываем все оверлеи и перенаправляем
      setIsOpenOverlay(false);
      setIsLogoutOpenModal(false);
      navigate('/');
    }
  };

  const handleClickReturn = () => {
    setIsLogoutOpenModal(false);
    setIsOpenMenu(true);
  };

  return (
    <div className={styles.container}>
      <span className={styles.text}>Хотите&nbsp;выйти из&nbsp;аккаунта?</span>
      <div className={styles.spinner}>
        <Spinner />
      </div>
      <div className={styles.wrapper}>
        <button
          className={styles.button__logout}
          type="button"
          onClick={handleClickLogout}
        >
          Да
        </button>
        <button
          className={styles.button__return}
          type="button"
          onClick={handleClickReturn}
        >
          Отмена
        </button>
      </div>
    </div>
  );
};
