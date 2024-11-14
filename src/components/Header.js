import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

// Estilizar el Toolbar
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'center', // Centramos el contenido en el AppBar
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  '@media all': {
    minHeight: 128,
  },
}));

// Componente de Fondo
const BackgroundImage = ({ isScrolled }) => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'url(/banner.png)', // Asegúrate de que esta es la ruta correcta
      backgroundSize: isScrolled ? 'cover' : 'auto 100%', // Reducir el tamaño de la imagen al hacer scroll
      backgroundPosition: 'center',
      zIndex: -1, // Poner la imagen por debajo del contenido
      width: '100%',
      height: '100%', // Asegura que la imagen ocupe todo el AppBar
      transition: 'background-size 0.3s ease', // Transición suave para el tamaño de la imagen
    }}
  />
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar el desplazamiento de la página
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20); // Cambia el valor según cuándo quieres que el tamaño cambie
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, position: 'relative', paddingBottom: 10 }}>
      {/* Componente que maneja el fondo de la imagen */}
      

      <AppBar
        position="fixed"
        style={{ paddingBottom: 20 }}
        sx={{
          backgroundColor: 'black', // Color negro para el AppBar
          boxShadow: 'none', // Quitar sombra
          height: isScrolled ? '60px' : '100%', // Cambiar tamaño al hacer scroll
          transition: 'height 0.3s ease', // Transición suave para el tamaño
          zIndex: 1, // Asegura que el AppBar esté por encima del fondo
          display: 'flex',
          justifyContent: 'center',
          
          
        }}
        
      >
        {/* Imagen de fondo dentro del AppBar */}
        <BackgroundImage isScrolled={isScrolled} />
        
        <StyledToolbar>
          <Typography
            variant={isScrolled ? 'h6' : 'h2'} // Cambiar tamaño de la fuente al hacer scroll
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: isScrolled ? 'left' : 'center',
              color: 'white',
              fontFamily: 'Helvetica, Helvetica Neue, Arial, Lucida Grande, sans-serif',
              fontWeight: 'bold', // Hacer el texto negrita
            }}
          >
            HOMEWARD
          </Typography>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
