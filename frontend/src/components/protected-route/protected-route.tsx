import styles from './protected-route.module.css';

import { Navigate, Outlet } from 'react-router-dom';

import { Spinner } from '../spinner/spinner';

import { useSelector } from '../../services/store';
import {
  selectIsAuthenticated,
  selectIsLoading,
} from '../../services/slices/auth/slice';

export const ProtectedRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);

  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Используем Outlet для отображения вложенных маршрутов
};
