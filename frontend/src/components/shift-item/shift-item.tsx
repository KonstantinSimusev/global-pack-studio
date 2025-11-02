import styles from './shift-item.module.css';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// import { Spinner } from '../spinner/spinner';
import { BackButton } from '../buttons/back/back';
import { AddButton } from '../buttons/add/add-button';
import { EditButton } from '../buttons/edit/edit';
import { DeleteButton } from '../buttons/delete/delete';
import { SuccessIcon } from '../icons/success/success';
import { TeamProfessionList } from '../profession-list/profession-list';

import { useDispatch, useSelector } from '../../services/store';
import { getUsersShifts } from '../../services/slices/user-shift/actions';
import { selectUsersShifts } from '../../services/slices/user-shift/slice';
import { SPECIAL_PROFESSIONS } from '../../utils/types';

export const ShiftItem = () => {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  const dispatch = useDispatch();
  // const isLoading = useSelector(selectIsLoading);

  const usersShifts = useSelector(selectUsersShifts);
  // const isTeamNumber = false;

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

  // if (isLoading) {
  //   return (
  //     <div className={styles.container__spiner}>
  //       <div className={styles.spinner}>{isLoading && <Spinner />}</div>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.container}>
      <BackButton />
      <TeamProfessionList />
      <AddButton actionType="worker" />
      {positionUsersShifts.length > 0 ? (
        <ul className={styles.list}>
          {positionUsersShifts.map((userShift) => (
            <li key={userShift.id} className={styles.item}>
              <div className={styles.wrapper__header}>
                <span className={styles.index}>
                  {String(userShift.position).padStart(2, '0')}
                </span>

                <div className={styles.wrapper__info}>
                  <span className={styles.wrapper}>
                    <span className={styles.title}>ФИО</span>
                    <span className={styles.text}>
                      {userShift.user.lastName}&nbsp;{userShift.user.firstName}{' '}
                      {userShift.user.patronymic}
                    </span>
                  </span>

                  <span className={styles.wrapper}>
                    <span className={styles.title}>Статус работы</span>
                    <span className={styles.text}>{userShift.workStatus}</span>
                  </span>

                  <span className={styles.wrapper}>
                    <span className={styles.title}>Профессия в смене</span>
                    <span className={styles.text}>
                      {userShift.user.profession}
                    </span>
                  </span>

                  <span className={styles.wrapper}>
                    <span className={styles.title}>Рабочее место</span>
                    <span className={styles.text}>{userShift.workPlace}</span>
                  </span>

                  <span className={styles.wrapper}>
                    <span className={styles.title}>Отработано чаосв</span>
                    <span className={styles.text}>{userShift.workHours}</span>
                  </span>
                </div>
              </div>

              <div className={styles.wrapper__success}>
                {userShift.workStatus !== 'Не определен' && (
                  <SuccessIcon width={30} height={30} />
                )}
                <div className={styles.wrapper__button}>
                  <EditButton
                    id={userShift.id}
                    actionType="worker"
                    iconWidth={30}
                    iconHeight={30}
                  />
                  {userShift.user.teamNumber !== userShift.shift.teamNumber && (
                    <DeleteButton
                      id={userShift.id}
                      actionType="worker"
                      iconWidth={30}
                      iconHeight={30}
                    />
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>Смены работников не найдены</div>
      )}
    </div>
  );
};
