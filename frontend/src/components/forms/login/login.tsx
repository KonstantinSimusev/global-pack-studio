import styles from './login.module.css';

import { useContext, useState } from 'react';
import { LayerContext } from '../../../contexts/layer/layerContext';
import { Spinner } from '../../spinner/spinner';
import {
  validateField,
  validateForm,
  validationRules,
} from '../../../utils/validation';
import { getRandomBoolean } from '../../../utils/utils';

interface IFormData {
  login: string;
  password: string;
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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<IFormData>({
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

  const handleClick = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Авторизация</h3>
      <form
        className={styles.form__login}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
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
