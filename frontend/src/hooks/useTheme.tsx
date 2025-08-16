import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, _] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // Если значение не сохранено или равно 'false' - возвращаем true
    return savedTheme === null || savedTheme === 'true';
  });

  useEffect(() => {
    const root = document.documentElement;

    // Сначала удаляем все темы
    root.classList.remove('theme-light', 'theme-dark');

    if (theme) {
      root.classList.add('theme-dark');
    } else {
      root.classList.add('theme-light');
    }
  }, [theme]);

  return theme;
};
