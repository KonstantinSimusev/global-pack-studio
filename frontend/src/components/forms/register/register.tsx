import styles from './register.module.css';

import { useContext, useState } from 'react';
import { LayerContext } from '../../../contexts/layer/layerContext';
// import { Spinner } from '../../spinner/spinner';
import {
  validateField,
  validateForm,
  validationRules,
} from '../../../utils/validation';
// import { useDispatch, useSelector } from '../../../services/store';
// import { registerUser } from '../../../services/slices/user/action';

export const RegisterForm = () => {
  // const dispatch = useDispatch();
  // const isLoading = useSelector((state) => state.users.status === 'loading');
  // const error = useSelector((state) => state.users.error);

  const {
    setIsLoginModalOpen,
    // setIsRegisterModalOpen,
    // setIsSuccessModalOpen,
    // setIsErrorModalOpen,
  } = useContext(LayerContext);

  // Состояние для хранения значений полей формы
  const [formData, setFormData] = useState({
    email: '',
    login: '',
    password: '',
  });

  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    email: '',
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
      try {
        // Отправляем данные через Redux Thunk
        // dispatch(registerUser(formData));

        // После успешной регистрации
        // setIsSuccessModalOpen(true);
        // setIsRegisterModalOpen(false);

        // Очистка формы
        setFormData({
          email: '',
          login: '',
          password: '',
        });

        // Очистка ошибок
        setErrors({ email: '', login: '', password: '' });
        // console.log(error);
      } catch (error) {
        // setIsErrorModalOpen(true);
        console.error('Ошибка регистрации:', error);
      }
    }
  };

  const handleClick = () => {
    setIsLoginModalOpen(true);
    // setIsRegisterModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Регистрация</h3>
      <form className={styles.form__register} onSubmit={handleSubmit}>
        <label className={styles.input__name}>Email</label>
        <input
          className={styles.input__email}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className={styles.errors}>
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

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
          {/* {isLoading && <Spinner />} */}
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
