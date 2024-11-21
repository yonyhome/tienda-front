import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

// Estilizar el Toolbar
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'center',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  '@media all': {
    minHeight: 128,
  },
}));

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  const handleScroll = () => {
    const currentScroll = window.scrollY;

    // Mostrar el header si se sube y ocultarlo si se baja
    if (currentScroll > lastScroll && currentScroll > 70) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }

    setLastScroll(currentScroll);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: 'black',
          boxShadow: 'none',
          height: '100px',
          transition: 'transform 0.3s ease',
          transform: showHeader ? 'translateY(0)' : 'translateY(-100%)',
          zIndex: 1,
        }}
      >
        <StyledToolbar>
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: 'center',
              color: 'white',
              fontFamily: 'Helvetica, Helvetica Neue, Arial, Lucida Grande, sans-serif',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              transition: 'font-size 0.3s ease',
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
