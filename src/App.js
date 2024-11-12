import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CheckoutPage from './pages/CheckoutPage';
import Cart from './components/Cart';
import { Drawer, IconButton, Badge, Box } from '@mui/material';

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleOpenCart = () => {
    setCartOpen(true);
  };

  const handleCloseCart = () => {
    setCartOpen(false);
  };

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
  
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <Router>
      <Header />
      
      {/* Agregar margen superior equivalente a la altura máxima del Header */}
      <Box sx={{ marginTop: { xs: '128px', sm: '128px', md: '60px' } }}>
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
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Box>

      {/* Drawer para el carrito */}
      <Drawer anchor="right" open={cartOpen} onClose={handleCloseCart}>
        <Cart
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
      </Drawer>

      {/* Botón para abrir el carrito con el badge actualizado */}
      <IconButton
        color="inherit"
        onClick={handleOpenCart}
        style={{ position: 'fixed', top: 22, right: 30, zIndex: 1000 }}
      >
        <Badge badgeContent={getTotalItems()} color="secondary">
          <img 
            src="/cart.png"  // Asegúrate de poner la ruta correcta de la imagen
            alt="Cart" 
            style={{ width: '50px', height: '50px', color: "white" }}  // Ajusta el tamaño de la imagen si es necesario
          />
        </Badge>
      </IconButton>
      
    </Router>
  );
}

export default App;
