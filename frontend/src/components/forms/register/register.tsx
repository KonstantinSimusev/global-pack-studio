import styles from './register.module.css';

import { useContext } from 'react';
import { LayerContext } from '../../../contexts/layer/layerContext';

export const RegisterForm = () => {
  const { setIsLoginModalOpen, setIsRegisterModalOpen, setIsSuccessModalOpen } =
    useContext(LayerContext);

  const handleClick = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRegisterModalOpen(false);
    setIsSuccessModalOpen(true);
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
