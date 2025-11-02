import styles from './update-worker.form.module.css';

import { useContext, useEffect, useState } from 'react';

import { LayerContext } from '../../../contexts/layer/layerContext';

import { Spinner } from '../../spinner/spinner';
import { DownIcon } from '../../icons/down/down';

import { useDispatch, useSelector } from '../../../services/store';

import {
  selectUserShiftById,
  selectError,
  selectIsLoading,
  clearError,
} from '../../../services/slices/user-shift/slice';

import {
  validateField,
  validateForm,
  validationRules,
} from '../../../utils/validation';

import {
  TEAM_PROFESSION_OPTIONS,
  WORK_PLACE_OPTIONS,
  WORK_STATUS_OPTIONS,
} from '../../../utils/types';
import {
  getUsersShifts,
  updateUserShift,
} from '../../../services/slices/user-shift/actions';
import { getCurrentShiftID } from '../../../utils/utils';

// Изменим тип IFormData на Record<string, string>
interface IFormData extends Record<string, string> {
  workStatus: string;
  shiftProfession: string;
  workPlace: string;
  workHours: string;
}

export const UpdateWorkerForm = () => {
  const {
    selectedId,
    isUpdateWorkerOpenModall,
    setIsOpenOverlay,
    setIsUpdateWorkerOpenModall,
  } = useContext(LayerContext);

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const userShift = useSelector((state) =>
    selectUserShiftById(state, selectedId),
  );

  if (!userShift?.user) {
    return null;
  }

  // Состояние для хранения значений полей формы
  const [formData, setFormData] = useState<IFormData>({
    workStatus: userShift.workStatus,
    shiftProfession: userShift?.user.profession,
    workPlace: userShift.workPlace,
    workHours: '',
  });

  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    workStatus: '',
    shiftProfession: '',
    workPlace: '',
    workHours: '',
  });

  useEffect(() => {
    if (isUpdateWorkerOpenModall) {
      dispatch(clearError());
    }
  }, [isUpdateWorkerOpenModall, dispatch]);

  // Обработчик изменения поля ввода
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
  const handleBlur = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Получаем ошибку валидации для поля
    const validationError = validateField(name, value, validationRules);

    // Обновляем состояние ошибок
    setErrors({
      ...errors,
      [name]: validationError || '',
    });
  };

  // Обработчик изменения поля ввода
  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const handleTextInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          id: userShift.id,
          workStatus: formData.workStatus,
          shiftProfession: formData.shiftProfession,
          workPlace: formData.workPlace,
          workHours: Number(formData.workHours),
        };

        const currentShiftId = getCurrentShiftID();

        const response = await dispatch(updateUserShift(payload));

        if (response.payload) {
          setIsUpdateWorkerOpenModall(false);
          setIsOpenOverlay(false);
          setErrors({ workStatus: '' });
          if (currentShiftId) {
            dispatch(getUsersShifts(currentShiftId));
          }
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
      <h3 className={styles.title}>Параметры смены</h3>
      <form className={styles.form__worker} onSubmit={handleSubmit}>
        <label className={styles.input__name}>Статус работы</label>
        <div className={styles.container__select}>
          <select
            className={styles.input__worker}
            name="workStatus"
            value={formData.workStatus}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              opacity: formData.workStatus === 'Не определен' ? 0.4 : 0.9,
            }}
          >
            {WORK_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <DownIcon />
        </div>
        <div className={styles.errors}>
          {errors.workStatus && (
            <span className={styles.error}>{errors.workStatus}</span>
          )}
        </div>

        <label className={styles.input__name}>Профессия в смене</label>
        <div className={styles.container__select}>
          <select
            className={styles.input__worker}
            name="shiftProfession"
            value={formData.shiftProfession}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {TEAM_PROFESSION_OPTIONS.map((profession) => (
              <option key={profession} value={profession}>
                {profession}
              </option>
            ))}
          </select>
          <DownIcon />
        </div>
        <div className={styles.errors}>
          {errors.shiftProfession && (
            <span className={styles.error}>{errors.shiftProfession}</span>
          )}
        </div>

        <label className={styles.input__name}>Рабочее место</label>
        <div className={styles.container__select}>
          <select
            className={styles.input__worker}
            name="workPlace"
            value={formData.workPlace}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              opacity: formData.workPlace === 'Не выбрано' ? 0.4 : 0.9,
            }}
          >
            {WORK_PLACE_OPTIONS.map((place) => (
              <option key={place} value={place}>
                {place}
              </option>
            ))}
          </select>
          <DownIcon />
        </div>
        <div className={styles.errors}>
          {errors.workPlace && (
            <span className={styles.error}>{errors.workPlace}</span>
          )}
        </div>

        <label className={styles.input__name}>Отработано часов</label>
        <input
          className={styles.input__worker}
          type="text"
          name="workHours"
          value={formData.workHours}
          onChange={handleTextInputChange}
          onBlur={handleTextInputBlur}
          placeholder="0"
        />
        <div className={styles.errors}>
          {errors.workHours && (
            <span className={styles.error}>{errors.workHours}</span>
          )}
        </div>

        <div className={styles.spinner}>{isLoading && <Spinner />}</div>
        {<div className={styles.errors__server}>{error}</div>}

        <button className={styles.button__worker}>Сохранить</button>
      </form>
    </div>
  );
};
