import styles from './login.module.css';

import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { LayerContext } from '../../../contexts/layer/layerContext';
import { Spinner } from '../../spinner/spinner';
import { validateField } from '../../../utils/validation';
import { getRandomBoolean } from '../../../utils/functions';

interface IFormData {
  login: string;
  password: string;
}

// Тип для ошибок валидации
interface IValidateFormData {
  [key: string]: string | null; // ключ - имя поля, значение - сообщение об ошибке или null
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

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<IValidateFormData>({});
  const [formData, setFormData] = useState<IFormData>({
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

  const handleLoginSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoader(true);

    // Очищаем текущие ошибки
    let validationErrors: IValidateFormData = {};

    // Валидируем все поля
    const fieldsToValidate: FormField[] = ['login', 'password'];

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
      <form
        className={styles.form__login}
        onSubmit={handleLoginSubmit}
        autoComplete="off"
      >
        <input
          className={styles.input__login}
          ref={inputRef}
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
