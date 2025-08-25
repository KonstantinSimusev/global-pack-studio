import styles from './register.module.css';

import { useContext, useState } from 'react';
import { Spinner } from '../../spinner/spinner';
import { LayerContext } from '../../../contexts/layer/layerContext';
import {
  validateField,
  validateForm,
  validationRules,
} from '../../../utils/validation';
import { getRandomBoolean } from '../../../utils/utils';

interface IFormData {
  email: string;
  login: string;
  password: string;
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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<IFormData>({
    email: '',
    login: '',
    password: '',
  });

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
    const errorMessage = validateField(value, fieldName, validationRules);
    if (errorMessage) {
      currentErrors[fieldName] = errorMessage;
    }

    // Обновляем состояние ошибок
    setErrors(currentErrors);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoader(true);

    // Преобразуем formData в Record<string, string>
    const formDataForValidation: Record<string, string> = {
      email: formData.email,
      login: formData.login,
      password: formData.password,
    };

    // Валидируем всю форму
    const formValidationErrors = validateForm(
      formDataForValidation,
      validationRules,
    );

    // Если есть ошибки - показываем их и останавливаем отправку
    if (Object.keys(formValidationErrors).length > 0) {
      setIsLoader(false);
      setErrors(formValidationErrors);
      return;
    }

    // логика отправки...

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

  const handleClick = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Регистрация</h3>
      <form
        className={styles.form__register}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <label className={styles.input__name}>Email</label>
        <input
          className={styles.input__email}
          type="email"
          // placeholder="Введите адрес почты..."
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <div className={styles.errors}>
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <label className={styles.input__name}>Логин</label>
        <input
          className={styles.input__login}
          type="text"
          // placeholder="Введите логин..."
          name="login"
          value={formData.login}
          onChange={handleChange}
        />
        <div className={styles.errors}>
          {errors.login && <span className={styles.error}>{errors.login}</span>}
        </div>
        <label className={styles.input__name}>Пароль</label>
        <input
          className={styles.input__password}
          type="password"
          // placeholder="Введите пароль..."
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
        onClick={handleClick}
      >
        Авторизоваться?
      </button>
    </div>
  );
};
