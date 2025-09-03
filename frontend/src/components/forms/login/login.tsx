import styles from './login.module.css';

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Spinner } from '../../spinner/spinner';

import { useDispatch, useSelector } from '../../../services/store';
import {
  selectError,
  selectIsLoading,
} from '../../../services/slices/auth/slice';
import { LayerContext } from '../../../contexts/layer/layerContext';
import { loginUser } from '../../../services/slices/auth/actions';

import {
  validateField,
  validateForm,
  validationRules,
} from '../../../utils/validation';

// Изменим тип ILoginData на Record<string, string>
interface ILoginData extends Record<string, string> {
  login: string;
  password: string;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  // const location = useLocation();
  // const { from } = location.state || { from: { pathname: '/timesheet' } };
  const { setIsOpenOverlay, setIsLoginModalOpen } = useContext(LayerContext);

  // Состояние для хранения значений полей формы
  const [formData, setFormData] = useState<ILoginData>({
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

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Валидируем всю форму
    const formErrors = validateForm(formData, validationRules);

    // Сохраняем все ошибки в состояние
    setErrors(formErrors);

    // Если форма валидна, можно отправить данные на сервер
    if (Object.keys(formErrors).length === 0) {
      try {
        // Перенаправляем на сохраненную страницу или на /timesheet
        // navigate(from.pathname);

        // Отправляем запрос и ждем ответа
        const response = await dispatch(loginUser(formData));

        // Проверяем, что авторизация прошла успешно
        if (response.payload) {
          navigate('/timesheet');
          setIsLoginModalOpen(false);
          setIsOpenOverlay(false);

          // Очистка формы
          setFormData({
            login: '',
            password: '',
          });

          // Очистка ошибок
          setErrors({ login: '', password: '' });
        } else {
          // Очистка формы
          setFormData({
            login: '',
            password: '',
          });
          throw new Error();
        }
      } catch (error) {
        throw new Error();
      }
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

        <div className={styles.spinner}>{isLoading && <Spinner />}</div>

        {<div className={styles.errors__server}>{error}</div>}

        <button className={styles.button__login}>Войти</button>
      </form>
    </div>
  );
};
