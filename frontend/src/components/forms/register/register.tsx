import styles from './register.module.css';

import { useContext } from 'react';
import { Spinner } from '../../spinner/spinner';
import { LayerContext } from '../../../contexts/layer/layerContext';
import { getRandomBoolean } from '../../../utils/functions';

export const RegisterForm = () => {
  const {
    isLoader,
    setIsLoginModalOpen,
    setIsRegisterModalOpen,
    setIsSuccessModalOpen,
    setIsErrorModalOpen,
    setIsAuth,
    setIsLoader,
  } = useContext(LayerContext);

  const handleClick = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoader(true);

    setTimeout(() => {

      if (getRandomBoolean()) {
        setIsSuccessModalOpen(true);
      } else {
        setIsErrorModalOpen(true);
      }

      setIsRegisterModalOpen(false);
      setIsAuth(false);
      setIsLoader(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Регистрация</h3>
      <form className={styles.form__register} onSubmit={handleSubmit}>
        <input
          className={styles.input__email}
          type="text"
          placeholder="Email"
        />
        <span className={styles.error} role="alert">
          Ошибка входа
        </span>
        <input
          className={styles.input__login}
          type="text"
          placeholder="Логин"
        />
        <span className={styles.error} role="alert">
          Ошибка входа
        </span>
        <input
          className={styles.input__password}
          type="password"
          placeholder="Пароль"
        />
        <span className={styles.error} role="alert">
          Ошибка входа
        </span>
        <div className={styles.spinner}>
          <Spinner isVisible={isLoader} />
        </div>
        <button className={styles.button__register} type="submit">
          Создать
        </button>
      </form>
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
