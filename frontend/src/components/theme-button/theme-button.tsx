import styles from './theme-button.module.css';

import { useEffect, useState } from 'react';

export const ThemeButton = () => {
  const [checked, setChecked] = useState(() => {
    const savedTheme = localStorage.getItem('theme');

    // Если в хранилище ничего нет
    if (savedTheme === null) {
      return true;
    }

    if (savedTheme === 'true') {
      return true;
    }

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
      <label className={styles.wrapper__input}>
        <input
          className={styles.input__hidden}
          type="checkbox"
          checked={checked}
          onChange={toggleTheme}
        />
        <span className={styles.input__text}>
          {checked ? 'Светлая тема' : 'Тёмная тема'}
        </span>
      </label>
    </div>
  );
};
