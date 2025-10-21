import styles from './team-worker-list.module.css';

import { useEffect } from 'react';

import { BackButton } from '../../buttons/back/back';
import { Spinner } from '../../spinner/spinner';

import {
  selectIsLoading,
  selectTeamUsers,
} from '../../../services/slices/user/slice';
import { getTeamUsers } from '../../../services/slices/user/actions';
import { useDispatch, useSelector } from '../../../services/store';
// import clsx from 'clsx';
import { EditButton } from '../../buttons/edit/edit';
import { DeleteButton } from '../../buttons/delete/delete';
import { AddButton } from '../../buttons/add/add-button';

export const TeamWorkerList = () => {
  const dispatch = useDispatch();
  const teamUsers = useSelector(selectTeamUsers);
  const isLoading = useSelector(selectIsLoading);

  const isTeamNumber = false;

  useEffect(() => {
    dispatch(getTeamUsers());
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container__spiner}>
        <div className={styles.spinner}>{isLoading && <Spinner />}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <BackButton />
      <AddButton actionType="worker" />
      {teamUsers.length > 0 ? (
        <ul className={styles.list}>
          {teamUsers.map((teamUser, index) => (
            <li key={teamUser.id} className={styles.item}>
              <div className={styles.wrapper__header}>
                <span className={styles.index}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className={styles.wrapper__button}>
                  <EditButton id={teamUser.id} />
                  {isTeamNumber && <DeleteButton id={teamUser.id} />}
                </div>
              </div>
              <span className={styles.wrapper__user}>
                <span className={styles.text}>{teamUser.lastName}</span>
                <span className={styles.text}>
                  {teamUser.firstName} {teamUser.patronymic}
                </span>
              </span>

              {/* <span className={styles.wrapper}>
                  <span className={clsx(styles.text, styles.opacity)}>
                    Профессия в смене
                  </span>
                  <span className={styles.text}>Укладчик-упаковщик</span>
                </span> */}
              {/* <span className={styles.wrapper}>
                  <span className={clsx(styles.text, styles.opacity)}>
                    Рабочее место
                  </span>
                  <span className={styles.text}>{'Не выбрано'}</span>
                </span> */}
              {/* <span className={styles.wrapper}>
                  <span className={clsx(styles.text, styles.opacity)}>
                    Отработано часов
                  </span>
                  <span className={styles.text}>{11.5}</span>
                </span> */}
            </li>
          ))}
        </ul>
      ) : (
        <div>Работники не найдены</div>
      )}
    </div>
  );
};
