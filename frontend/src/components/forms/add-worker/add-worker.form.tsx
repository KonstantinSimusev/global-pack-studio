import styles from './add-worker.form.module.css';

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Spinner } from '../../spinner/spinner';

import { useDispatch, useSelector } from '../../../services/store';
import {
  selectError,
  selectIsLoading,
  clearError,
} from '../../../services/slices/auth/slice';
import { LayerContext } from '../../../contexts/layer/layerContext';

import {
  validateField,
  validateForm,
  validationRules,
} from '../../../utils/validation';

// Изменим тип IFormData на Record<string, string>
interface IFormData extends Record<string, string> {
  personalNumber: string;
}

export const AddWorkerForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const { setIsOpenOverlay, setIsAddWorkerOpenModall } =
    useContext(LayerContext);

  // Состояние для хранения значений полей формы
  const [formData, setFormData] = useState<IFormData>({
    personalNumber: '',
  });

  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    personalNumber: '',
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

    // Очищаем ошибки с сервера
    dispatch(clearError());
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
        const payload = {
          personalNumber: Number(formData.personalNumber),
        };

        // const response = await dispatch(addWorker(payload));

        // if (response.payload) {
        if (payload) {
          setIsAddWorkerOpenModall(false);
          setIsOpenOverlay(false);
          setFormData({ personalNumber: '' });
          setErrors({ personalNumber: '' });
          navigate('/teamworkers');
        } else {
          setFormData({ personalNumber: '' });
          throw new Error();
        }
      } catch (error) {
        throw new Error();
      }
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Новый работник</h3>
      <form className={styles.form__worker} onSubmit={handleSubmit}>
        <label className={styles.input__name}>Личный номер</label>
        <input
          className={styles.input__worker}
          type="text"
          name="personalNumber"
          value={formData.personalNumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className={styles.errors}>
          {errors.personalNumber && (
            <span className={styles.error}>{errors.personalNumber}</span>
          )}
        </div>

        <div className={styles.spinner}>{isLoading && <Spinner />}</div>
        {<div className={styles.errors__server}>{error}</div>}

        <button className={styles.button__worker}>Добавить</button>
      </form>
    </div>
  );
};
