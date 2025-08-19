import styles from './switch.module.css';

import { useContext } from 'react';

import { ThemeContext } from '../../contexts/themeContext';

import { ThemeIcon } from '../icons/theme/theme';

export const Switch = () => {
  const {isLightTheme, setIsLightTheme} = useContext(ThemeContext);
 
  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Сохраняем новое состояние
    setIsLightTheme(e.target.checked);
  };

  return (
    <div className={styles.container}>
      <ThemeIcon />
      <span className={styles.text}>Тёмная тема</span>
      <label className={styles.switch}>
        <input
          className={styles.input__hidden}
          type="checkbox"
          checked={isLightTheme}
          onChange={toggleTheme}
        />
        <span className={styles.switch__slider}></span>
      </label>
    </div>
  );
};
