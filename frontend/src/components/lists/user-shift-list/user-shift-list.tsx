import styles from './user-shift-list.module.css';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { EditButton } from '../../buttons/edit/edit';
import { DeleteButton } from '../../buttons/delete/delete';
import { SuccessIcon } from '../../icons/success/success';

import { useDispatch, useSelector } from '../../../services/store';
import { getUsersShifts } from '../../../services/slices/user-shift/actions';
import { selectUsersShifts } from '../../../services/slices/user-shift/slice';
import { SPECIAL_PROFESSIONS } from '../../../utils/types';
import { formatDate } from '../../../utils/utils';

export const UserShiftList = () => {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  const dispatch = useDispatch();
  const usersShifts = useSelector(selectUsersShifts);

  useEffect(() => {
    dispatch(getUsersShifts(id));
  }, [dispatch, id]);

  // Функция для добавления position по профессиям
  const addPositionByProfession = (shifts: any[]) => {
    const counters: { [profession: string]: number } = {};

    // 1. Выделяем специальные записи и сортируем их по sortOrder
    const specialItems = shifts
      .filter((item) => SPECIAL_PROFESSIONS.includes(item.user.profession))
      .sort((a, b) => a.sortOrder - b.sortOrder);

    // 2. Создаём карту: id специальной записи → её новый position (1, 2 или 3)
    const specialPositionMap = new Map<string, number>();
    specialItems.forEach((item, index) => {
      specialPositionMap.set(item.id, index + 1);
    });

    // 3. Проходим по исходному массиву shifts и формируем результат
    return shifts.map((item) => {
      const profession = item.user.profession;

      // Если запись — специальная, берём номер из карты
      if (specialPositionMap.has(item.id)) {
        return {
          ...item,
          position: specialPositionMap.get(item.id),
        };
      }

      // Для обычных профессий — счётчик по профессии
      if (!counters[profession]) {
        counters[profession] = 1;
      } else {
        counters[profession]++;
      }

      return {
        ...item,
        position: counters[profession],
      };
    });
  };

  // Применяем нумерацию к usersShifts
  const positionUsersShifts =
    usersShifts.length > 0 ? addPositionByProfession(usersShifts) : [];

  return (
    <>
      {positionUsersShifts.length > 0 ? (
        <ul className={styles.list}>
          {positionUsersShifts.map((userShift) => (
            <li key={userShift.id} className={styles.item}>
              <div className={styles.wrapper__header}>
                <span className={styles.index}>
                  {String(userShift.position).padStart(2, '0')}
                </span>
                <div className={styles.wrapper__edit}>
                  {userShift.workPlace !== 'Не выбрано' && (
                    <SuccessIcon width={30} height={30} />
                  )}
                  <EditButton
                    id={userShift.id}
                    actionType="worker"
                    iconWidth={30}
                    iconHeight={30}
                  />
                </div>
              </div>

              <div className={styles.wrapper}>
                <span className={styles.title}>ФИО</span>
                <span className={styles.text}>
                  {userShift.user.lastName}&nbsp;{userShift.user.firstName}{' '}
                  {userShift.user.patronymic}
                </span>
              </div>

              <div className={styles.wrapper}>
                <span className={styles.title}>Статус работы</span>
                <span className={styles.text}>{userShift.workStatus}</span>
              </div>

              <div className={styles.wrapper}>
                <span className={styles.title}>Профессия в смене</span>
                <span className={styles.text}>{userShift.shiftProfession}</span>
              </div>

              <div className={styles.wrapper}>
                <span className={styles.title}>Рабочее место</span>
                <span className={styles.text}>{userShift.workPlace}</span>
              </div>

              <div className={styles.wrapper}>
                <span className={styles.title}>Отработано часов</span>
                <span className={styles.text}>{userShift.workHours}</span>
              </div>

              <div className={styles.wrapper}>
                <span className={styles.title}>№ смены</span>
                <span className={styles.text}>
                  Смена {userShift.shift.shiftNumber}
                </span>
              </div>

              <div className={styles.wrapper}>
                <span className={styles.title}>№ бригады</span>
                <span className={styles.text}>
                  Бригада {userShift.shift.teamNumber}
                </span>
              </div>

              <div className={styles.wrapper__delete}>
                <div className={styles.wrapper}>
                  <span className={styles.title}>Дата</span>
                  <span className={styles.text}>
                    {formatDate(userShift.shift.date)}
                  </span>
                </div>

                {userShift.user.teamNumber !== userShift.shift.teamNumber && (
                  <DeleteButton
                    id={userShift.id}
                    actionType="userShift"
                    iconWidth={30}
                    iconHeight={30}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>Смены работников не найдены</div>
      )}
    </>
  );
};
