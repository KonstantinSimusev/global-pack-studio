import styles from './logout.module.css';

import { useContext } from 'react';
import { LayerContext } from '../../contexts/layer/layerContext';
import { Spinner } from '../spinner/spinner';

export const Logout = () => {
  const { setIsOpenMenu, setIsOpenOverlay, setIsLogoutOpenModal } =
    useContext(LayerContext);

  const handleClickLogout = () => {
    setIsOpenOverlay(false);
    setIsLogoutOpenModal(false);
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
