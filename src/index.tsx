import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppContainer } from './design/common';
import App from './App';
import './i18n/i18n';
import { theme } from './design/theme/default';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <AppContainer>
        <App />
      </AppContainer>
    </ThemeProvider>
  </React.StrictMode>
);
