import './css/index.css';
import App from './components/app/app';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './contexts/themeContext';
import { LayerProvider } from './contexts/layerContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LayerProvider>
        <App />
      </LayerProvider>
    </ThemeProvider>
  </StrictMode>,
);
