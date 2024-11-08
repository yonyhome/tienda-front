import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa desde 'react-dom/client'
import App from './App';
import { CssBaseline } from '@mui/material';

// Crea el root usando createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza tu componente App dentro de ese root
root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
