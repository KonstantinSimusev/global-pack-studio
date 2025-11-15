import styles from './production.form.module.css';

import { useContext, useEffect, useState } from 'react';

import { Spinner } from '../../spinner/spinner';

import { useDispatch, useSelector } from '../../../services/store';
import {
  selectError,
  selectIsLoadingUserShift,
  clearError,
} from '../../../services/slices/user-shift/slice';
import { LayerContext } from '../../../contexts/layer/layerContext';

import {
  validateField,
  validateForm,
  validationRules,
} from '../../../utils/validation';
// import { getCurrentShiftID } from '../../../utils/utils';
// import {
//   createUserShift,
//   getUsersShifts,
// } from '../../../services/slices/user-shift/actions';

// Изменим тип IFormData на Record<string, string>
interface IFormData extends Record<string, string> {
  total: string;
}

export const ProductionForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingUserShift);
  const error = useSelector(selectError);
  const { isProductionOpenMdal, selectedId, setIsOpenOverlay, setIsProductionOpenMdal } =
    useContext(LayerContext);

  // Состояние для хранения значений полей формы
  const [formData, setFormData] = useState<IFormData>({
    total: '',
  });

  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    total: '',
  });

  useEffect(() => {
    if (isProductionOpenMdal) {
      dispatch(clearError());
    }
  }, [isProductionOpenMdal, dispatch]);

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
        // const currentShiftId = getCurrentShiftID();

        // if (!currentShiftId) {
        //   throw new Error();
        // }

        const payload = {
          total: Number(formData.total),
          id: selectedId,
        };

        // const response = await dispatch(createUserShift(payload));

        // if (response.payload) {
          if (payload) {
          setIsProductionOpenMdal(false);
          setIsOpenOverlay(false);

          // const shiftID = getCurrentShiftID();

          // if (shiftID) {
            // если shiftID не null
            // dispatch(getUsersShifts(shiftID)); // shiftID гарантированно string
          // }
        } 
      } catch (error) {
        // dispatch(clearError())
        throw new Error();
      }
    }
  };

  // Определяем, заблокирована ли кнопка
  const isButtonDisabled = isLoading || !formData.total;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>АИ</h3>
      <form className={styles.form__production} onSubmit={handleSubmit}>
        <label className={styles.input__name}>Производство за смену, рул</label>
        <input
          className={styles.input__production}
          type="text"
          name="total"
          value={formData.total}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className={styles.errors}>
          {errors.total && (
            <span className={styles.error}>{errors.total}</span>
          )}
        </div>

        <div className={styles.spinner}>{isLoading && <Spinner />}</div>
        {<div className={styles.errors__server}>{error}</div>}

        <button
          type="submit"
          className={styles.button__production}
          disabled={isButtonDisabled}
          // style={{
          //   opacity: isButtonDisabled ? 0.4 : 0.9,
          // }}
        >
          Сохранить
        </button>
      </form>
    </div>
  );
};
