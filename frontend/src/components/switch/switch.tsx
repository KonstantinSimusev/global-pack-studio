import styles from './switch.module.css';

import { useEffect, useState } from 'react';
import { ThemeIcon } from '../icons/theme/theme';

export const Switch = () => {
  const [checked, setChecked] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // Если значение не сохранено или равно 'false' - возвращаем true
    return savedTheme === null || savedTheme === 'true';
  });

  useEffect(() => {
    const root = document.documentElement;

    // Сначала удаляем все темы
    root.classList.remove('theme-light', 'theme-dark');

    if (checked) {
      root.classList.add('theme-dark');
    } else {
      root.classList.add('theme-light');
    }

    try {
      localStorage.setItem('theme', String(checked));
    } catch (error) {
      console.error('Ошибка сохранения в localStorage', error);
    }
  }, [checked]);

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Сохраняем новое состояние
    setChecked(e.target.checked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.circle}>
          <ThemeIcon />
        </div>
        <span className={styles.title}>Тёмная тема</span>
      </div>
      <label className={styles.switch}>
        <input
          className={styles.visuallyHidden}
          type="checkbox"
          checked={checked}
          onChange={toggleTheme}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};
