import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Grid, Container, CircularProgress, Box, Drawer } from '@mui/material';
import Cart from '../components/Cart';
import ProductDetailsModal from '../components/ProductDetailsModal';
import { fetchProducts } from '../services/utils';

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
    const loadProducts = async () => {
      setLoading(true);
      const products = await fetchProducts(); // Llamada a la función desde utils.js
      setProductos(products);
      setLoading(false);
    };

    loadProducts();
  }, []);

  const toggleCart = () => {
    setCartOpen((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemoveFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
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

  const handleOpenProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <Container>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {productos.map((producto) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={3}
                key={producto.id}
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              >
                <ProductCard product={producto} onAddToCart={onAddToCart} onOpenDetails={handleOpenProductDetails} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Drawer anchor="right" open={cartOpen} onClose={toggleCart}>
        <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />
      </Drawer>

      <ProductDetailsModal product={selectedProduct} onClose={handleCloseProductDetails} />
    </>
  );
};

export default Home;
