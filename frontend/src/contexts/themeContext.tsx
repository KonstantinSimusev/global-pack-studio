import { createContext, useEffect, useState } from 'react';

interface TThemeContextProps {
  isLightTheme: boolean;
  setIsLightTheme: (value: boolean) => void;
}

interface TThemeProvider {
  children: React.ReactNode;
}

export const ThemeContext = createContext<TThemeContextProps>({
  isLightTheme: true,
  setIsLightTheme: () => {},
});

export const ThemeProvider = ({ children }: TThemeProvider) => {
  const [isLightTheme, setIsLightTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');

    // Если в хранилище ничего нет
    if (savedTheme === null) {
      console.log(1);
      return true;
    }

    // Если в хранилище светлая тема
    if (savedTheme === 'true') {
      console.log(2);
      return true;
    }

    // Если в хранилище светлая тема
    console.log(3);
    return false;
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
