import styles from './login.module.css';

import { useContext, useState } from 'react';
import { LayerContext } from '../../../contexts/layer/layerContext';
import { Spinner } from '../../spinner/spinner';
import { getRandomBoolean } from '../../../utils/functions';

interface IFormData {
  login: string;
  password: string;
}

interface IValidateFormData {
  login?: string;
  password?: string;
}

// Определяем тип для полей формы
type FormField = keyof IFormData;

export const LoginForm = () => {
  const {
    isLoader,
    setIsOpenOverlay,
    setIsLoginModalOpen,
    setIsRegisterModalOpen,
    setIsAuth,
    setIsLoader,
  } = useContext(LayerContext);

  const [formData, setFormData] = useState<IFormData>({
    login: '',
    password: '',
  });

  const [errors, setErrors] = useState<IValidateFormData>({});

  const validateLogin = (login: string) => /^[a-zA-Z0-9_]{3,20}$/.test(login);

  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);

  const validateField = (fieldName: FormField) => {
    let errorMessage = '';

    switch (fieldName) {
      case 'login':
        if (!formData.login) {
          errorMessage = 'Логин обязателен';
        } else if (!validateLogin(formData.login)) {
          errorMessage = 'Не менее 3 символов';
        }
        break;

      case 'password':
        if (!formData.password) {
          errorMessage = 'Пароль обязателен';
        } else if (!validatePassword(formData.password)) {
          errorMessage = 'Не менее 8 символов';
        }
        break;
    }

    return errorMessage;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    const fieldName = name as FormField;

    // Обновляем данные формы
    setFormData({
      ...formData,
      [fieldName]: value,
    });

    // Очищаем ошибки для текущего поля
    const currentErrors = { ...errors };
    delete currentErrors[fieldName];

    // Валидируем текущее поле
    const errorMessage = validateField(fieldName);
    if (errorMessage) {
      currentErrors[fieldName] = errorMessage;
    }

    // Обновляем состояние ошибок
    setErrors(currentErrors);
  };

  const handleLoginSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoader(true);

    // Очищаем текущие ошибки
    let validationErrors: IValidateFormData = {};

    // Валидируем все поля
    const fieldsToValidate: FormField[] = ['login', 'password'];

    fieldsToValidate.forEach((field) => {
      const errorMessage = validateField(field);
      if (errorMessage) {
        validationErrors[field] = errorMessage;
      }
    });

    // Если есть ошибки - показываем их и останавливаем отправку
    if (Object.keys(validationErrors).length > 0) {
      setIsLoader(false);
      setErrors(validationErrors);
      return;
    }

    setTimeout(() => {
      if (getRandomBoolean()) {
        setIsLoginModalOpen(false);
        setIsOpenOverlay(false);
        setIsAuth(true);
      } else {
      }

      // Очистка формы
      setFormData({
        login: '',
        password: '',
      });

      // Очистка ошибок
      setErrors({});

      setIsLoader(false);
    }, 2000);
  };

  const handleRegisterClick = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Авторизация</h3>
      <form className={styles.form__login} onSubmit={handleLoginSubmit}>
        <input
          className={styles.input__login}
          type="text"
          placeholder="Логин"
          name="login"
          value={formData.login}
          onChange={handleChange}
          autoCapitalize="off"
        />
        <div className={styles.errors}>
          {errors.login && <span className={styles.error}>{errors.login}</span>}
        </div>
        <input
          className={styles.input__password}
          type="password"
          placeholder="Пароль"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoCapitalize="off"
        />
        <div className={styles.errors}>
          {errors.password && (
            <span className={styles.error}>{errors.password}</span>
          )}
        </div>
        <div className={styles.spinner}>
          <Spinner isVisible={isLoader} />
        </div>
        <button className={styles.button__login} type="submit">
          Войти
        </button>
      </form>
      <button
        className={styles.button__register}
        type="button"
        onClick={handleRegisterClick}
      >
        Зарегистрироваться?
      </button>
    </div>
  );
};
