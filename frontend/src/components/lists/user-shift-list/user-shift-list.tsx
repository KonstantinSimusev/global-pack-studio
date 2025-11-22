import styles from './user-shift-list.module.css';

import { useEffect } from 'react';

import { EditButton } from '../../buttons/edit/edit';
import { DeleteButton } from '../../buttons/delete/delete';
import { SuccessIcon } from '../../icons/success/success';

import { useDispatch, useSelector } from '../../../services/store';
import { getUsersShifts } from '../../../services/slices/user-shift/actions';
import { selectUsersShifts } from '../../../services/slices/user-shift/slice';
import { SPECIAL_PROFESSIONS } from '../../../utils/types';
import { InfoBlock } from '../../ui/info-block/info-block';
import { UserBlock } from '../../ui/user-block/user-block';
import { Error } from '../../ui/error/error';
import { selectCurrentShift } from '../../../services/slices/shift/slice';

interface IUserShiftProps {
  shiftId?: string;
}

export const UserShiftList = ({ shiftId }: IUserShiftProps) => {
  if (!shiftId) {
    return null;
  }

  const dispatch = useDispatch();
  const usersShifts = useSelector(selectUsersShifts);
  const shift = useSelector(selectCurrentShift);

  useEffect(() => {
    dispatch(getUsersShifts(shiftId));
  }, [dispatch, shiftId]);

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
                    <SuccessIcon width={32} height={32} />
                  )}

                  <EditButton
                    id={userShift.id}
                    actionType="worker"
                    iconWidth={30}
                    iconHeight={30}
                  />
                </div>
              </div>

              <UserBlock
                lastName={userShift.user.lastName}
                firstName={userShift.user.firstName}
                patronymic={userShift.user.patronymic}
              />

              <InfoBlock title={'Статус работы'} text={userShift.workStatus} />
              <InfoBlock
                title={'Профессия в смене'}
                text={userShift.shiftProfession}
              />
              <InfoBlock title={'Рабочее место'} text={userShift.workPlace} />

              <div className={styles.wrapper__delete}>
                <InfoBlock
                  title={'Отработано часов'}
                  text={userShift.workHours}
                />

                {userShift.user.teamNumber !== shift?.teamNumber && (
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
        <Error message={'Смены работников не найдены'} />
      )}
    </>
  );
};
