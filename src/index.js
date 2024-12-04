import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { initGA } from './analytics'; // Importa la función initGA

// Define el tema con la fuente deseada
const theme = createTheme({
  palette: {
    primary: { main: '#000000' },
    secondary: { main: '#8a9597' },
  },
  typography: { fontFamily: 'Helvetica,Helvetica Neue,Arial,Lucida Grande,sans-serif' },
});

// Inicializa Google Analytics al cargar la aplicación
initGA();

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
