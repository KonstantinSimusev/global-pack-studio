import { useState } from 'react';

import styles from './switch.module.css';

export const Switch = () => {
  const [checked, setChecked] = useState(true);

  const toggleTheme = () => {
    const root = document.documentElement;

    root.classList.remove('theme-dark', 'theme-light');

    if (!checked) {
      root.classList.add('theme-dark');
    } else {
      root.classList.add('theme-light');
    }

    setChecked(!checked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.circle}>
          <svg className={styles.monthIcon} viewBox="0 0 47.539 47.539">
            <path
              fill="currentColor"
              d="M24.997 47.511C11.214 47.511 0 36.298 0 22.515 0 12.969 5.314 4.392 13.869.132a.999.999 0 0 1 1.343 1.336 22.757 22.757 0 0 0-2.352 10.133c0 12.681 10.316 22.997 22.997 22.997 3.59 0 7.033-.809 10.236-2.403a.999.999 0 0 1 1.343 1.336c-4.24 8.622-12.839 13.98-22.439 13.98zM12.248 3.372C5.862 7.608 2 14.709 2 22.515c0 12.68 10.316 22.996 22.997 22.996 7.854 0 14.981-3.898 19.207-10.343a24.758 24.758 0 0 1-8.346 1.43c-13.783 0-24.997-11.214-24.997-24.997 0-2.84.466-5.596 1.387-8.229z"
            />
          </svg>
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
