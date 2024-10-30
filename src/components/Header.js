import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = ({ cartCount, onOpenCart }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Tienda
        </Typography>
        {/* IconButton para abrir el carrito con Badge */}
        <IconButton 
          color="inherit" 
          onClick={onOpenCart} 
          style={{ position: 'fixed', top: 20, right: 80, zIndex: 1000 }} // Asegura que esté delante
        >
          <Badge badgeContent={cartCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
