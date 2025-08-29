import './css/index.css';
import App from './components/app/app';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { store } from './services/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from './contexts/theme/themeProvider';
import { LayerProvider } from './contexts/layer/layerProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <LayerProvider>
          <App />
        </LayerProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
