import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Define el tema con la fuente deseada
const theme = createTheme({
  typography: {
    fontFamily: 'Helvetica, Helvetica Neue, Arial, Lucida Grande, sans-serif',
  },
});

// Crea el root usando createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza tu componente App dentro de ese root con el ThemeProvider
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
