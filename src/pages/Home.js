import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import axios from 'axios';
import { Grid2, Container, CircularProgress, Box, Drawer } from '@mui/material';

const Home = ({ onAddToCart }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('https://script.google.com/macros/s/AKfycbyZrttp0G4aO6BuG8uNHYC3jtJfP-XgxAzc5Lt5dqaSYfVu1LVcj1CIGrKWY4BJP5VWcw/exec');
        if (response.data.result === 'success') {
          setProductos(response.data.data);
        } else {
          console.error('Error al obtener productos:', response.data.message);
        }
      } catch (error) {
        console.error('Error de red o de API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const toggleCart = () => {
    setCartOpen(prev => !prev); // Toggle cart open/close
  };

  return (
    <>
      <Container maxWidth="lg" style={{ padding: '20px 0' }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : (
          <Grid2 container spacing={3} justifyContent="center">
            {productos.map((producto) => (
              <Grid2 
                item 
                xs={6} 
                sm={4}  
                md={3}  
                key={producto.id} 
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <ProductCard product={producto} onAddToCart={onAddToCart} />
              </Grid2>
            ))}
          </Grid2>
        )}
      </Container>

      {/* Drawer for the cart */}
      <Drawer anchor="right" open={cartOpen} onClose={toggleCart}>
        <Cart cartItems={cartItems} onRemoveFromCart={(id) => setCartItems(cartItems.filter(item => item.id !== id))} />
      </Drawer>
    </>
  );
};

export default Home;
