import styles from './register.module.css';

import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { Spinner } from '../../spinner/spinner';
import { LayerContext } from '../../../contexts/layer/layerContext';
import { validateField } from '../../../utils/validation';
import { getRandomBoolean } from '../../../utils/functions';

interface IFormData {
  email: string;
  login: string;
  password: string;
}

// Тип для ошибок валидации
interface IValidateFormData {
  [key: string]: string | null; // ключ - имя поля, значение - сообщение об ошибке или null
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

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<IValidateFormData>({});
  const [formData, setFormData] = useState<IFormData>({
    email: '',
    login: '',
    password: '',
  });

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
    const errorMessage = validateField(value, fieldName);
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
      const errorMessage = validateField(formData[field], field);
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

    console.log(formData);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Регистрация</h3>
      <form
        className={styles.form__register}
        onSubmit={handleRegisterSubmit}
        autoComplete="off"
      >
        <input
          className={styles.input__email}
          ref={inputRef}
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
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
