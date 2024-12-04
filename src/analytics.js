import ReactGA from 'react-ga4';

// Inicializar Google Analytics
export const initGA = () => {
  ReactGA.initialize('G-YH7E0KGF83');
};

// Registrar vistas de página
export const trackPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};
