import styles from './register.module.css';

import { useContext, useState } from 'react';
import { Spinner } from '../../spinner/spinner';
import { LayerContext } from '../../../contexts/layer/layerContext';
import { getRandomBoolean } from '../../../utils/functions';

interface IFormData {
  email: string;
  login: string;
  password: string;
}

interface IValidateFormData {
  email?: string;
  login?: string;
  password?: string;
}

// Определяем тип для полей формы
type FormField = keyof IFormData;

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

  const [formData, setFormData] = useState<IFormData>({
    email: '',
    login: '',
    password: '',
  });

  const [errors, setErrors] = useState<IValidateFormData>({});

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateLogin = (login: string) => /^[a-zA-Z0-9_]{3,20}$/.test(login);

  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);

  const validateField = (fieldName: FormField) => {
    let errorMessage = '';

    switch (fieldName) {
      case 'email':
        if (!formData.email) {
          errorMessage = 'Email обязателен';
        } else if (!validateEmail(formData.email)) {
          errorMessage = 'Неверный формат email';
        }
        break;

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

  const handleRegisterSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoader(true);

    // Очищаем текущие ошибки
    let validationErrors: IValidateFormData = {};

    // Валидируем все поля
    const fieldsToValidate: FormField[] = ['email', 'login', 'password'];

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
        setIsSuccessModalOpen(true);
      } else {
        setIsErrorModalOpen(true);
      }

      // Очистка формы
      setFormData({
        email: '',
        login: '',
        password: '',
      });

      // Очистка ошибок
      setErrors({});

      setIsRegisterModalOpen(false);
      setIsAuth(false);
      setIsLoader(false);
    }, 2000);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Регистрация</h3>
      <form className={styles.form__register} onSubmit={handleRegisterSubmit}>
        <input
          className={styles.input__email}
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoCapitalize="off"
        />
        <div className={styles.errors}>
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
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
        <button className={styles.button__register} type="submit">
          Создать
        </button>
      </form>
      <button
        className={styles.button__login}
        type="button"
        onClick={handleLoginClick}
      >
        Авторизоваться?
      </button>
    </div>
  );
};
