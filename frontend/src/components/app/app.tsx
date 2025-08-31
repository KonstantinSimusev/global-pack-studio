import styles from './app.module.css';
import clsx from 'clsx';

import { useContext, useEffect } from 'react';

import { ThemeContext } from '../../contexts/theme/themeContext';
import { LayerContext } from '../../contexts/layer/layerContext';

import { Header } from '../header/header';
import { Banner } from '../banner/banner';
import { Home } from '../pages/home/home';
import { Timesheet } from '../pages/timesheet/timesheet';
import { Production } from '../pages/production/production';
import { Footer } from '../footer/footer';
import { NotFound } from '../pages/not-found/not-found';
import { Overlay } from '../overlay/overlay';
import { LoginForm } from '../forms/login/login';
import { Modal } from '../modal/modal';
import { useDispatch } from '../../services/store';
// import { selectIsAuthenticated } from '../../services/slices/auth/slice';
import { checkRefreshToken } from '../../services/slices/auth/actions';
import { Logout } from '../loguot/logout';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  const { isLightTheme } = useContext(ThemeContext);
  const { isOpenOverlay, isLoginModalOpen, isLogoutOpenModal } =
    useContext(LayerContext);
  // const isAuthenticated  = useSelector(selectIsAuthenticated);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkRefreshToken());
  }, []);

  return (
    <div
      className={clsx(
        styles.container,
        isLightTheme ? 'theme-light' : 'theme-dark',
        isOpenOverlay && styles.container__fixed,
      )}
    >
      <Header />
      <Banner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timesheet" element={<Timesheet />} />
        <Route path="/production" element={<Production />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />

      {isOpenOverlay && <Overlay />}

      {isLoginModalOpen && (
        <Modal>
          <LoginForm />
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
