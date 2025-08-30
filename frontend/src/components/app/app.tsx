import styles from './app.module.css';
import clsx from 'clsx';

import { useContext, useEffect } from 'react';

import { ThemeContext } from '../../contexts/theme/themeContext';
import { LayerContext } from '../../contexts/layer/layerContext';

import { Header } from '../header/header';
import { Banner } from '../banner/banner';
import { Home } from '../pages/home/home';
import { Footer } from '../footer/footer';
import { Overlay } from '../overlay/overlay';
import { LoginForm } from '../forms/login/login';
import { Modal } from '../modal/modal';
import { useDispatch } from '../../services/store';
// import { selectIsAuthenticated } from '../../services/slices/auth/slice';
import { checkRefreshToken } from '../../services/slices/auth/actions';
import { Logout } from '../loguot/logout';

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
      <Home />
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
