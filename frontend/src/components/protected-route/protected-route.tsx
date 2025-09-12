import styles from './protected-route.module.css';

import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Spinner } from '../spinner/spinner';

import { useSelector } from '../../services/store';
import {
  selectIsAuthenticated,
  selectIsLoading,
} from '../../services/slices/auth/slice';
import { LayerContext } from '../../contexts/layer/layerContext';

export const ProtectedRoute = () => {
  const { setIsCookie } = useContext(LayerContext);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();
  const navigate = useNavigate();

  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setIsCookie(true);
    // Сохраняем текущий путь при загрузке
    setCurrentPath(location.pathname);

    // Обновляем состояние истории браузера
    if (!window.history.state?.path) {
      window.history.replaceState(
        { path: location.pathname },
        '',
        location.pathname,
      );
    }

    navigate(currentPath, { replace: true });
  }, [isAuthenticated, currentPath, location.pathname, navigate]);

  if (isLoading) {
    return <div className={styles.spinner}>{isLoading && <Spinner />}</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />; // Используем Outlet для отображения вложенных маршрутов
};
