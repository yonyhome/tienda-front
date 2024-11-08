import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CheckoutPage from './pages/CheckoutPage';
import Cart from './components/Cart';
import { Drawer, Button } from '@mui/material';

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
    const productWithSize = { ...product, talla }; // Asegurarse de incluir talla correctamente
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
  
  
  

  return (
    <Router>
      <Header cartCount={cartItems.length} onOpenCart={handleOpenCart} />
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

      {/* Drawer para el carrito */}
      <Drawer anchor="right" open={cartOpen} onClose={handleCloseCart}>
        <Cart
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
      </Drawer>

      {/* Botón para abrir el carrito */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenCart}
        style={{ position: 'fixed', top: 20, right: 20 }}
      >
        Carrito
      </Button>
    </Router>
  );
}

export default App;
