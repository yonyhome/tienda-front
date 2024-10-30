import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CheckoutPage from './pages/CheckoutPage';
import Cart from './components/Cart'; // Importa el componente del carrito
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

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  return (
    <Router>
      <Header cartCount={cartItems.length} onOpenCart={handleOpenCart} />
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} cartItems={cartItems} />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>

      {/* Drawer para el carrito */}
      <Drawer anchor="right" open={cartOpen} onClose={handleCloseCart}>
        <Cart cartItems={cartItems} onRemoveFromCart={(id) => setCartItems(cartItems.filter(item => item.id !== id))} />
      </Drawer>
      
      {/* Botón para abrir el carrito (opcional) */}
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleOpenCart} 
        style={{ position: 'fixed', top: 20, right: 20 }} // Posición fija
      >
        Carrito
      </Button>
    </Router>
  );
}

export default App;
