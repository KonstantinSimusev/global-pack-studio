import styles from './logout.module.css';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Spinner } from '../spinner/spinner';

import { LayerContext } from '../../contexts/layer/layerContext';

export const Logout = () => {
  const navigate = useNavigate();
  const { setIsOpenMenu, setIsOpenOverlay, setIsLogoutOpenModal } =
    useContext(LayerContext);

  const handleClickLogout = () => {
    setIsOpenOverlay(false);
    setIsLogoutOpenModal(false);
    navigate('/');
  };

  const handleClickReturn = () => {
    setIsLogoutOpenModal(false);
    setIsOpenMenu(true);
  };

  return (
    <div className={styles.container}>
      <span className={styles.text}>Хотите выйти из&nbsp;аккаунта?</span>
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
