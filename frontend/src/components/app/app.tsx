import styles from './app.module.css';
import clsx from 'clsx';

import { useContext } from 'react';

import { ThemeContext } from '../../contexts/theme/themeContext';
import { LayerContext } from '../../contexts/layer/layerContext';

import { Header } from '../header/header';
import { Banner } from '../banner/banner';
import { Home } from '../pages/home/home';
import { Footer } from '../footer/footer';
import { Overlay } from '../overlay/overlay';
import { LoginForm } from '../forms/login/login';
import { Modal } from '../modal/modal';

const App = () => {
  const { isLightTheme } = useContext(ThemeContext);
  const { isOpenOverlay, isLoginModalOpen } = useContext(LayerContext);

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
    </div>
  );
};

export default App;
