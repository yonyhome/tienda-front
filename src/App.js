import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './components/Cart';
import { Drawer, IconButton, Badge, Box } from '@mui/material';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [headerHeight, setHeaderHeight] = useState(128); // Valor inicial (puedes ajustarlo)

  const handleOpenCart = () => setCartOpen(true);
  const handleCloseCart = () => setCartOpen(false);

  const handleUpdateQuantity = (id, talla, increment) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.talla === talla
          ? { ...item, quantity: Math.max(item.quantity + increment, 1) }
          : item
      )
    );
  };

  const handleRemoveFromCart = (id, talla) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.talla === talla))
    );
  };

  const handleAddToCart = (product, talla) => {
    const productWithSize = { ...product, talla };
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === productWithSize.id && item.talla === talla
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === productWithSize.id && item.talla === talla
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...productWithSize, quantity: 1 }];
      }
    });
  };

  const handleEmptyCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    // Manejo del cambio de altura del header al hacer scroll
    const handleScroll = () => {
      setHeaderHeight(window.scrollY > 20 ? 60 : 128); // Cambia la altura según el scroll
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
        <Badge badgeContent={getTotalItems()} color="secondary">
          <img
            src="/cart.png"
            alt="Cart"
            style={{ width: '50px', height: '50px', color: 'white' }}
          />
        </Badge>
      </IconButton>
    </Router>
  );
}

export default App;
