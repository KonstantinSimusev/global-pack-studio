import styeles from './default.module.css';

import { useContext } from 'react';
import { LayerContext } from '../../../contexts/layer/layerContext';

export const DefaultPage = () => {
  const { isCookie, setIsCookie } = useContext(LayerContext);

  return (
    <div className={styeles.container}>
      {isCookie && <p className={styeles.text}>Пожалуйста, авторизуйтесь...</p>}
      {!isCookie && (
        <div className={styeles.container__agree}>
          <div className={styeles.container__agree}>
            <h4>Этот сайт использует:</h4>
            <ul className={styeles.items}>
              <li>Cookie-файлы для сохранения авторизации</li>
              <li>LocalStorage для хранения настроек темы (светлая/тёмная)</li>
            </ul>
            <p>
              Эти технологии помогают сделать ваш опыт использования сайта более
              удобным и персонализированным.
            </p>
            <h4>Ваши права:</h4>
            <ul className={styeles.items}>
              <li>Вы можете в любой момент изменить настройки</li>
              <li>
                Имеете право отказаться от использования этих технологий (это
                может повлиять на работу сайта)
              </li>
            </ul>
            <p>
              Продолжая использовать сайт, вы даёте согласие на обработку данных
              в соответствии с нашей политикой конфиденциальности
            </p>
          </div>
          <div className={styeles.container__agree}>
            <h3 className={styeles.title__politic}>Политика конфиденциальности</h3>
            <ul className={styeles.list__politic}>
              <li>
                <h4 className={styeles.title}>1. Общие положения</h4>
                <p>
                  Настоящая политика определяет порядок обработки и защиты
                  информации, собираемой на сайте.
                </p>
              </li>
              <li>
                <h4 className={styeles.title}>2. Цели обработки данных</h4>
                <ul className={styeles.items}>
                  <li>Авторизация пользователей через систему cookie</li>
                  <li>
                    Сохранение настроек темы сайта (светлая/тёмная) в
                    LocalStorage
                  </li>
                  <li>Улучшение пользовательского опыта</li>
                </ul>
              </li>
              <li>
                <h4 className={styeles.title}>3. Виды собираемой информации</h4>
                <ul className={styeles.items}>
                  <li>Технические данные о браузере</li>
                  <li>Настройки темы сайта</li>
                  <li>Данные авторизации (через cookie)</li>
                </ul>
              </li>
              <li>
                <h4 className={styeles.title}>4. Сроки хранения</h4>
                <ul className={styeles.items}>
                  <li>Cookie хранятся до момента выхода пользователя</li>
                  <li>Настройки темы сохраняются до ручного удаления</li>
                </ul>
              </li>
              <li>
                <h4 className={styeles.title}>5. Права пользователей</h4>
                <p className={styeles.title}>Доступ к информации:</p>
                <ul className={styeles.items}>
                  <li>Технические данные о браузере</li>
                  <li>Настройки темы сайта</li>
                  <li>Данные авторизации (через cookie)</li>
                </ul>
              </li>
              <li>
                <h4 className={styeles.title}>6. Безопасность данных</h4>
                <p>
                  Мы обеспечиваем защиту собираемой информации с помощью
                  современных технических средств.
                </p>
              </li>
              <li>
                <h4 className={styeles.title}>7. Контактная информация</h4>
                <p>
                  По вопросам обработки данных обращайтесь к администратору.
                </p>
              </li>
              <li>
                <h4 className={styeles.title}>8. Изменения политики</h4>
                <p>Мы оставляем за собой право вносить изменения в политику.</p>
              </li>
            </ul>
          </div>
          <button
            type="button"
            className={styeles.button__agree}
            onClick={() => setIsCookie(true)}
          >
            Принять
          </button>
        </div>
      )}
    </div>
  );
};
