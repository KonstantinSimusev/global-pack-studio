import styles from './app.module.css';
import clsx from 'clsx';

import { useContext, useEffect, useState } from 'react';
import { Header } from '../header/header';
import { Banner } from '../banner/banner';
import { Loader } from '../loader/loader';
import { Overlay } from '../overlay/overlay';
import { Modal } from '../modal/modal';
import { ThemeContext } from '../../contexts/themeContext';
import { LayerContext } from '../../contexts/layerContext';
import { LoginForm } from '../forms/login/login';

const App = () => {
  const { isLightTheme } = useContext(ThemeContext);
  const { isOpenOverlay } = useContext(LayerContext);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isVisible]);

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
      <div className={styles.content}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        odit doloribus inventore non aspernatur sapiente possimus est, placeat
        voluptatibus necessitatibus, ea aliquid in accusantium repellendus
        laborum quis provident quibusdam vero qui odio fuga veritatis ratione
        sunt. Voluptatibus, enim amet corporis id quo dolores officia
        perspiciatis maiores accusamus eius minus? Dicta error deleniti velit,
        blanditiis natus earum sint sunt excepturi saepe adipisci repudiandae,
        perferendis porro quo voluptas. Nihil quidem ipsam consectetur,
        dignissimos, eos modi illo, dolores dolorem molestiae nulla ducimus
        ullam reprehenderit? Sequi animi sunt provident rerum quos non ut
        voluptatum, corrupti eum maiores quis beatae rem natus illo temporibus!
      </div>
      <div className={styles.content}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
        aliquam. Voluptate similique amet temporibus iste illum fugit.
        Aspernatur possimus aliquid animi id labore earum iure! Cupiditate
        quaerat sit aliquid porro recusandae ea iusto, id, nihil impedit dolores
        minus iste corporis enim dicta repudiandae nemo voluptatem deleniti
        quasi corrupti veritatis animi! Iusto, consequuntur eveniet! Corporis
        facilis impedit accusamus ea soluta beatae excepturi doloremque natus
        libero sed possimus, minima quibusdam nulla repudiandae ipsam sint.
        Blanditiis magni nulla odio suscipit, maxime facere est alias culpa fuga
        dolorem non magnam dolore obcaecati at amet numquam fugit ad temporibus
        illo! Ipsum, ea! Nisi ipsa, tenetur soluta illo itaque, quia dignissimos
        ducimus voluptates, provident incidunt voluptas nulla laboriosam
        voluptate adipisci blanditiis aperiam sunt optio assumenda quod modi quo
        harum accusamus! Natus debitis recusandae libero consequuntur, aut
        accusamus doloremque repudiandae neque in. Totam maiores ipsam
        temporibus deserunt, tempora, molestias cupiditate iste sed eaque
        repudiandae dignissimos reprehenderit? Vero earum magni asperiores
        repudiandae libero provident necessitatibus eligendi mollitia, velit ex
        commodi laboriosam error illum aperiam id in rerum exercitationem
        recusandae animi dignissimos natus facilis quis! Architecto, fuga. Odit
        quibusdam ducimus quasi, ex qui earum repellendus dolorum porro
        doloremque?
      </div>
      <Overlay />
      <Modal>
        <LoginForm />
      </Modal>
      <Loader isVisible={isVisible} />
    </div>
  );
};

export default App;
