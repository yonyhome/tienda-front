import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { Grid, Container, CircularProgress, Box, Drawer } from '@mui/material';
import Cart from '../components/Cart';
import ProductDetailsModal from '../components/ProductDetailsModal';

const Home = ({ onAddToCart }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado para el modal

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('https://script.google.com/macros/s/AKfycbyZrttp0G4aO6BuG8uNHYC3jtJfP-XgxAzc5Lt5dqaSYfVu1LVcj1CIGrKWY4BJP5VWcw/exec');
        if (response.data.result === 'success') {
          const productsWithImages = response.data.data.map(product => ({
            ...product,
            imagenUrl: product.imagenes[0] || 'ruta_a_imagen_placeholder.jpg'
          }));
          setProductos(productsWithImages);
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
    setCartOpen(prev => !prev); // Alternar la apertura/cierre del carrito
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemoveFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id, talla, increment) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.talla === talla ? { ...item, quantity: Math.max(item.quantity + increment, 1) } : item
      )
    );
  };

  const handleOpenProductDetails = (product) => {
    setSelectedProduct(product); // Establecer el producto seleccionado para el modal
  };

  const handleCloseProductDetails = () => {
    setSelectedProduct(null); // Cerrar el modal
  };

  return (
    <>
      <Container maxWidth="lg" style={{ padding: '20px 0' }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {productos.map((producto) => (
              <Grid item xs={6} sm={4} md={3} key={producto.id} style={{ display: 'flex', justifyContent: 'center' }}>
                <ProductCard product={producto} onAddToCart={onAddToCart} onOpenDetails={handleOpenProductDetails} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Drawer anchor="right" open={cartOpen} onClose={toggleCart}>
        <Cart 
          cartItems={cartItems} 
          onRemoveFromCart={handleRemoveFromCart} 
          onUpdateQuantity={handleUpdateQuantity} 
        />
      </Drawer>

      {/* Modal de detalles del producto */}
      <ProductDetailsModal 
        product={selectedProduct} 
        onClose={handleCloseProductDetails} 
      />
    </>
  );
};

export default Home;
