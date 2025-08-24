import styles from './app.module.css';
import clsx from 'clsx';

import { useContext } from 'react';

import { ThemeContext } from '../../contexts/theme/themeContext';
import { LayerContext } from '../../contexts/layer/layerContext';

import { Header } from '../header/header';
import { Banner } from '../banner/banner';
import { Home } from '../pages/home/home';
import { Foreman } from '../pages/foreman/foreman';
import { Footer } from '../footer/footer';
import { Overlay } from '../overlay/overlay';
import { LoginForm } from '../forms/login/login';
import { Modal } from '../modal/modal';
import { RegisterForm } from '../forms/register/register';
import { Success } from '../success/success';
import { Error } from '../error/error';

const App = () => {
  const { isLightTheme } = useContext(ThemeContext);
  const {
    isOpenOverlay,
    isLoginModalOpen,
    isRegisterModalOpen,
    isSuccessModalOpen,
    isErrorModalOpen,
    isAuth,
  } = useContext(LayerContext);

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
      {!isAuth && <Home />}
      {isAuth && <Foreman />}
      <Footer />

      {isOpenOverlay && <Overlay />}

      {isLoginModalOpen && (
        <Modal>
          <LoginForm />
        </Modal>
      )}

      {isRegisterModalOpen && (
        <Modal>
          <RegisterForm />
        </Modal>
      )}

      {isSuccessModalOpen && (
        <Modal>
          <Success />
        </Modal>
      )}

      {isErrorModalOpen && (
        <Modal>
          <Error />
        </Modal>
      )}
    </div>
  );
};

export default App;
