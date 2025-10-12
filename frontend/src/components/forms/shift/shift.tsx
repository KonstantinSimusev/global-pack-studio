import styles from './shift.module.css';

import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Spinner } from '../../spinner/spinner';

import { useDispatch, useSelector } from '../../../services/store';
import {
  selectError,
  selectIsLoading,
  clearError,
} from '../../../services/slices/shift/slice';
import { LayerContext } from '../../../contexts/layer/layerContext';

import {
  validateField,
  validateForm,
  validationRules,
} from '../../../utils/validation';
import { createShift, getShifts } from '../../../services/slices/shift/actions';
import type { IShift } from '../../../utils/api.interface';
import { checkAccessToken } from '../../../services/slices/auth/actions';
import { selectUser } from '../../../services/slices/auth/slice';

// Изменим тип IFormData на Record<string, string>
interface IFormData extends Record<string, string> {
  date: string;
  shiftNumber: string;
  // teamNumber: string;
}

export const ShiftForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const serverError = useSelector(selectError);
  const { isAddShiftOpenModall, setIsOpenOverlay, setIsAddShiftOpenModall } =
    useContext(LayerContext);

  // Состояние для хранения значений полей формы
  const [formData, setFormData] = useState<IFormData>({
    date: '',
    shiftNumber: '',
    // teamNumber: '',
  });

  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    date: '',
  });

  useEffect(() => {
    if (serverError === 'Ошибка при создании смены') {
      setIsAddShiftOpenModall(false);
      setIsOpenOverlay(false);
      dispatch(checkAccessToken());
      return;
    }
  }, [serverError]);

  useEffect(() => {
    if (isAddShiftOpenModall) {
      dispatch(clearError());
    }
  }, [isAddShiftOpenModall, dispatch]);

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
        const data: IShift = {
          date: new Date(formData.date),
          shiftNumber: parseInt(formData.shiftNumber, 10),
          teamNumber: user?.teamNumber ?? 0,
        };

        const response = await dispatch(createShift(data));

        if (response.payload) {
          navigate('/timesheet');
          setIsAddShiftOpenModall(false);
          setIsOpenOverlay(false);
          dispatch(getShifts());
        } else {
          throw new Error();
        }
      } catch (error) {
        throw new Error();
      }
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Новая смена</h3>
      <form className={styles.form__shift} onSubmit={handleSubmit}>
        <label className={styles.input__name}>Дата</label>
        <input
          className={styles.input__date}
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className={styles.errors}>
          {errors.date && <span className={styles.error}>{errors.date}</span>}
        </div>

        <label className={styles.input__name}>Номер смены</label>
        <input
          className={styles.input__shiftNumber}
          type="text"
          name="shiftNumber"
          value={formData.shiftNumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className={styles.errors}>
          {errors.shiftNumber && (
            <span className={styles.error}>{errors.shiftNumber}</span>
          )}
        </div>

        {/* <label className={styles.input__name}>Номер бригады</label>
        <input
          className={styles.input__teamNumber}
          type="text"
          name="teamNumber"
          value={formData.teamNumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className={styles.errors}>
          {errors.teamNumber && (
            <span className={styles.error}>{errors.teamNumber}</span>
          )}
        </div> */}

        <div className={styles.spinner}>{isLoading && <Spinner />}</div>
        {<div className={styles.errors__server}>{serverError}</div>}

        <button className={styles.button__shift}>Создать</button>
      </form>
    </div>
  );
};
