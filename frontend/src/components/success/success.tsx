import styles from './success.module.css';

import { useContext } from 'react';
import { LayerContext } from '../../contexts/layer/layerContext';
import { SuccessIcon } from '../icons/success/success';

export const Success = () => {
  const { setIsLoginModalOpen, setIsSuccessModalOpen } =
    useContext(LayerContext);

  const handleClick = () => {
    setIsLoginModalOpen(true);
    setIsSuccessModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <SuccessIcon />
      </div>
      <span className={styles.text}>Вы успешно зарегистрировались!</span>
      <button
        className={styles.button__login}
        type="button"
        onClick={handleClick}
      >
        Авторизоваться?
      </button>
    </div>
  );
};
