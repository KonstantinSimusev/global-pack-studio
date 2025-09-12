import { useEffect, useState } from 'react';
import { ThemeContext } from './themeContext';

interface TThemeProvider {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: TThemeProvider) => {
  const [isLightTheme, setIsLightTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === null) {
      return false;
    }

    // Если в хранилище светлая тема
    if (savedTheme === 'false') {
      return false;
    }

    // Если в хранилище светлая тема
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;

    // Сначала удаляем все темы
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(isLightTheme ? 'theme-light' : 'theme-dark');

    try {
      localStorage.setItem('theme', String(isLightTheme));
    } catch (error) {
      console.error('Ошибка сохранения в localStorage', error);
    }
  }, [isLightTheme]);

  return (
    <ThemeContext.Provider value={{ isLightTheme, setIsLightTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
