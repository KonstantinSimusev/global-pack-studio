import styles from './app.module.css';
import clsx from 'clsx';

import { useContext, useEffect, useState } from 'react';
import { Header } from '../header/header';
import { Banner } from '../banner/banner';
import { MenuProvider } from '../../contexts/menuContext';
import { ThemeContext, ThemeProvider } from '../../contexts/themeContext';
import { Loader } from '../loader/loader';

// const initialData = {
//   date: '12 августа 2025 года',
//   shifty: 2,
//   team: 3
// }

const App = () => {
  const [isLoader, setIsloader] = useState(true);
  const { isLightTheme } = useContext(ThemeContext);

  useEffect(() => {
    console.log(localStorage);

    const timer = setTimeout(() => {
      setIsloader(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isLoader]);

  return (
    <ThemeProvider>
      <MenuProvider>
        <div
          className={clsx(
            styles.container,
            isLightTheme ? 'theme-light' : 'theme-dark',
          )}
        >
          <Header />
          <Banner />
          <div className={styles.content}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            odit doloribus inventore non aspernatur sapiente possimus est,
            placeat voluptatibus necessitatibus, ea aliquid in accusantium
            repellendus laborum quis provident quibusdam vero qui odio fuga
            veritatis ratione sunt. Voluptatibus, enim amet corporis id quo
            dolores officia perspiciatis maiores accusamus eius minus? Dicta
            error deleniti velit, blanditiis natus earum sint sunt excepturi
            saepe adipisci repudiandae, perferendis porro quo voluptas. Nihil
            quidem ipsam consectetur, dignissimos, eos modi illo, dolores
            dolorem molestiae nulla ducimus ullam reprehenderit? Sequi animi
            sunt provident rerum quos non ut voluptatum, corrupti eum maiores
            quis beatae rem natus illo temporibus!
          </div>
          <div className={styles.content}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            odit doloribus inventore non aspernatur sapiente possimus est,
            placeat voluptatibus necessitatibus, ea aliquid in accusantium
            repellendus laborum quis provident quibusdam vero qui odio fuga
            veritatis ratione sunt. Voluptatibus, enim amet corporis id quo
            dolores officia perspiciatis maiores accusamus eius minus? Dicta
            error deleniti velit, blanditiis natus earum sint sunt excepturi
            saepe adipisci repudiandae, perferendis porro quo voluptas. Nihil
            quidem ipsam consectetur, dignissimos, eos modi illo, dolores
            dolorem molestiae nulla ducimus ullam reprehenderit? Sequi animi
            sunt provident rerum quos non ut voluptatum, corrupti eum maiores
            quis beatae rem natus illo temporibus! Aspernatur corporis ducimus
            dignissimos iure consequatur quo incidunt id sapiente dolorum
            exercitationem. Totam praesentium officiis maiores reprehenderit
            temporibus iure hic incidunt error soluta suscipit aliquid,
            blanditiis voluptas neque. Delectus voluptatum distinctio numquam
            ipsa hic voluptate dolore! Amet quidem sunt, cum expedita
            exercitationem doloremque facilis provident accusamus blanditiis
            cupiditate aut, nostrum praesentium architecto ipsam soluta natus
            ratione! Odit deserunt dolore molestiae provident possimus officiis
            officia, pariatur cum temporibus aperiam? Pariatur sequi quae nemo
            consequatur laboriosam animi. Quisquam voluptates repellendus animi
            cupiditate tenetur? Labore iure aut voluptatum non tempore pariatur
            ratione. Magni illo quasi cum harum a natus itaque aliquam animi
            commodi aspernatur?
          </div>
        </div>
        {isLoader ? <Loader /> : null}
      </MenuProvider>
    </ThemeProvider>
  );
};

export default App;
