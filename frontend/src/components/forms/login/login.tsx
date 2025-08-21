import type { FormEvent } from 'react';
import styles from './login.module.css';

export const LoginForm = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('hello');
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Авторизация</h3>
      <form className={styles.form__login} onSubmit={handleSubmit}>
        <div>
        <input
          className={styles.input__login}
          type="text"
          placeholder="Логин"
          aria-describedby="errorLogin"
        />
        <span id="errorLogin" className={styles.error} role="alert">
          Ошибка входа
        </span>
        </div>
        <div>
        <input
          className={styles.input__password}
          type="password"
          placeholder="Пароль"
          aria-describedby="errorPassword"
        />
        <span id="errorPassword" className={styles.error} role="alert">
          Ошибка входа
        </span>
        </div>
        <button className={styles.button__login} type="submit">
          Войти
        </button>
      </form>
      <span className={styles.button__register}>Зарегистрироваться?</span>
    </div>
  );
};
