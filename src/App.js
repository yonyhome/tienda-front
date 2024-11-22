import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './components/Cart';
import WhatsAppButton from './components/WhatsappButton';
import { Drawer, IconButton, Badge, Box } from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  emptyCart,
  getTotalItems,
  playSound
} from './services/utils';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [headerHeight, setHeaderHeight] = useState(128); // Valor inicial
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSnackbar = (message, severity = 'success') => {
    playSound();
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const handleOpenCart = () => setCartOpen(true);
  const handleCloseCart = () => setCartOpen(false);

  const handleAddToCart = (product, talla) => {
    setCartItems((prevItems) => addToCart(prevItems, product, talla));
  };

  const handleRemoveFromCart = (id, talla) => {
    setCartItems((prevItems) => removeFromCart(prevItems, id, talla));
  };

  const handleUpdateQuantity = (id, talla, increment) => {
    setCartItems((prevItems) => updateCartQuantity(prevItems, id, talla, increment));
  };

  const handleEmptyCart = () => {
    setCartItems(emptyCart());
    handleCloseCart();
  };

  useEffect(() => {
    const handleScroll = () => {
      setHeaderHeight(window.scrollY > 20 ? 60 : 128);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <Header />
      <Box sx={{ marginTop: `${headerHeight}px` }}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onAddToCart={handleAddToCart}
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveFromCart={handleRemoveFromCart}

              />
            }
          />
        </Routes>
      </Box>

      <Drawer anchor="right" open={cartOpen} onClose={handleCloseCart}>
        <Cart
          setSnackbar={showSnackbar} 
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onEmptyCart={handleEmptyCart}
          onCloseCart={handleCloseCart}
        />
      </Drawer>

      <IconButton
        color="inherit"
        onClick={handleOpenCart}
        style={{ position: 'fixed', top: 22, right: 30, zIndex: 1000 }}
      >
        <Badge badgeContent={getTotalItems(cartItems)} color="secondary">
          <img
            src="/cart.png"
            alt="Cart"
            style={{ width: '50px', height: '50px', color: 'white' }}
          />
        </Badge>
      </IconButton>
      <WhatsAppButton />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
        onClose={handleSnackbarClose}
        severity={snackbar.severity}
        sx={{ width: '100%' }}
      >
        {snackbar.message} {/* Aquí debe ser una cadena */}
      </Alert>
      </Snackbar>
    </Router>
  );
}

export default App;
