import './css/index.css';
import App from './components/app/app';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './contexts/theme/themeProvider';
import { LayerProvider } from './contexts/layer/layerProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LayerProvider>
        <App />
      </LayerProvider>
    </ThemeProvider>
  </StrictMode>,
);
