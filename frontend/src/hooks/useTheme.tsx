import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, _] = useState(() => {
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

    if (theme) {
      root.classList.add('theme-light');
    } else {
      root.classList.add('theme-dark');
    }
  }, [theme]);

  return theme;
};
