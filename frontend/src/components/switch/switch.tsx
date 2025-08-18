import styles from './switch.module.css';

import { useEffect, useState } from 'react';

import { ThemeIcon } from '../icons/theme/theme';

export const Switch = () => {
  const [checked, setChecked] = useState(() => {
    const savedTheme = localStorage.getItem('theme');

    // Если в хранилище ничего нет
    if (savedTheme === null) {
      console.log(1);
      return true;
    }
    
    if (savedTheme === 'true') {
      console.log(2);
      return true;
    }
    console.log(3);
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;

    // Сначала удаляем все темы
    root.classList.remove('theme-light', 'theme-dark');

    if (checked) {
      root.classList.add('theme-light');
    } else {
      root.classList.add('theme-dark');
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
      <ThemeIcon />
      <span className={styles.text}>Тёмная тема</span>
      <label className={styles.switch}>
        <input
          className={styles.input__hidden}
          type="checkbox"
          checked={checked}
          onChange={toggleTheme}
        />
        <span className={styles.switch__slider}></span>
      </label>
    </div>
  );
};
