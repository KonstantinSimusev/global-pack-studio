import styles from './back.module.css';

import { BackIcon } from '../../icons/back/back';

import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/timesheet');
  };

  return (
    <button className={styles.container} type="button" onClick={handleClick}>
      <BackIcon />
      <span className={styles.text}>Назад</span>
    </button>
  );
};
