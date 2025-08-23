import styles from './login.module.css';

import { useContext } from 'react';
import { LayerContext } from '../../../contexts/layer/layerContext';

export const LoginForm = () => {
  const { setIsLoginModalOpen, setIsRegisterModalOpen } =
    useContext(LayerContext);
  const handleClick = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('hello');
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Авторизация</h3>
      <form className={styles.form__login} onSubmit={handleSubmit}>
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
        <button className={styles.button__login} type="submit">
          Войти
        </button>
      </form>
      <button
        className={styles.button__register}
        type="button"
        onClick={handleClick}
      >
        Зарегистрироваться?
      </button>
    </div>
  );
};
