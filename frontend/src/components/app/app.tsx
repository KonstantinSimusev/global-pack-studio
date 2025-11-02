import styles from './app.module.css';
import clsx from 'clsx';

import { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ThemeContext } from '../../contexts/theme/themeContext';
import { LayerContext } from '../../contexts/layer/layerContext';

import { Header } from '../header/header';
import { Banner } from '../banner/banner';
import { Home } from '../pages/home/home';
import { Timesheet } from '../pages/timesheet/timesheet';
import { Production } from '../pages/production/production';
import { Footer } from '../footer/footer';
import { DefaultPage } from '../pages/default/default';
import { NotFound } from '../pages/not-found/not-found';
import { Overlay } from '../overlay/overlay';
import { Modal } from '../modal/modal';
import { LoginForm } from '../forms/login/login';
import { ShiftForm } from '../forms/shift/shift';
import { AddWorkerForm } from '../forms/add-worker/add-worker.form';
import { Logout } from '../loguot/logout';
import { Delete } from '../delete/delete';
import { ShiftItem } from '../shift-item/shift-item';

import { ProtectedRoute } from '../protected-route/protected-route';

import { checkAccessToken } from '../../services/slices/auth/actions';
import { useDispatch } from '../../services/store';
import { getCurrentShiftID } from '../../utils/utils';
import { getUsersShifts } from '../../services/slices/user-shift/actions';
import { UpdateWorkerForm } from '../forms/update-worker/update-worker.form';

const App = () => {
  const { isLightTheme } = useContext(ThemeContext);
  const {
    isOpenOverlay,
    isLoginModalOpen,
    isLogoutOpenModal,
    isAddWorkerOpenModall,
    isUpdateWorkerOpenModall,
    isAddShiftOpenModall,
    isDeleteOpenModall,
  } = useContext(LayerContext);
  // const location = useLocation();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentShiftId = getCurrentShiftID();

  useEffect(() => {
    console.log('✅ App смонтирован');
    dispatch(checkAccessToken());

    if (currentShiftId) {
      dispatch(getUsersShifts(currentShiftId));
    }
  }, []);

  console.log('🔁 App отрендерен');

  return (
    <div
      className={clsx(
        styles.container,
        isLightTheme ? 'theme-light' : 'theme-dark',
        isOpenOverlay && styles.container__fixed,
        isOpenOverlay && styles.no_scroll,
      )}
    >
      <Header />
      <Banner />
      <Routes>
        <Route path="/" element={<DefaultPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/timesheet" element={<Timesheet />} />
          <Route path="/timesheet/shifts/:id" element={<ShiftItem />} />
          <Route path="/production" element={<Production />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />

      {isOpenOverlay && <Overlay />}

      {isLoginModalOpen && (
        <Modal>
          <LoginForm />
        </Modal>
      )}

      {isAddWorkerOpenModall && (
        <Modal>
          <AddWorkerForm />
        </Modal>
      )}

      {isUpdateWorkerOpenModall && (
        <Modal>
          <UpdateWorkerForm />
        </Modal>
      )}

      {isAddShiftOpenModall && (
        <Modal>
          <ShiftForm />
        </Modal>
      )}

      {isDeleteOpenModall && (
        <Modal>
          <Delete />
        </Modal>
      )}

      {isLogoutOpenModal && (
        <Modal>
          <Logout />
        </Modal>
      )}
    </div>
  );
};

export default App;
