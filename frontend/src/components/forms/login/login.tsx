import styles from './login.module.css';

import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { Spinner } from '../../spinner/spinner';

import { LayerContext } from '../../../contexts/layer/layerContext';

import {
  validateField,
  validateForm,
  validationRules,
} from '../../../utils/validation';

export const LoginForm = () => {
  const { setIsOpenOverlay, setIsLoginModalOpen } = useContext(LayerContext);

  // Состояние для хранения значений полей формы
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    login: '',
    password: '',
  });

  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    login: '',
    password: '',
  });

  // Обработчик изменения поля ввода
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Обновляем данные формы
    setFormData({
      ...formData,
      [name]: value,
    });

    // Сбрасываем ошибку при начале ввода
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  // Обработчик потери фокуса для валидации
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Получаем ошибку валидации для поля
    const validationError = validateField(name, value, validationRules);

    // Обновляем состояние ошибок
    setErrors({
      ...errors,
      [name]: validationError || '',
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Валидируем всю форму
    const formErrors = validateForm(formData, validationRules);

    // Сохраняем все ошибки в состояние
    setErrors(formErrors);

    // Если форма валидна, можно отправить данные на сервер
    if (Object.keys(formErrors).length === 0) {
      console.log(formData);

      // логика отправки...

      setIsLoginModalOpen(false);
      setIsOpenOverlay(false);

      // Очистка формы
      setFormData({
        login: '',
        password: '',
      });

      // Очистка ошибок
      setErrors({ login: '', password: '' });
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Авторизация</h3>
      <form className={styles.form__login} onSubmit={handleSubmit}>
        <label className={styles.input__name}>Логин</label>
        <input
          className={styles.input__login}
          type="text"
          name="login"
          value={formData.login}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className={styles.errors}>
          {errors.login && <span className={styles.error}>{errors.login}</span>}
        </div>

        <label className={styles.input__name}>Пароль</label>
        <input
          className={styles.input__password}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className={styles.errors}>
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>

        <div className={styles.spinner}>
          <Spinner />
        </div>
        <button className={styles.button__login} type="submit">
          <Link to="/timesheet">Войти</Link>
        </button>
      </form>
    </div>
  );
};
