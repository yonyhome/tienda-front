import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { Grid2, Container } from '@mui/material';

const Home = () => {
  const [productos, setProductos] = useState([]);

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
      }
    };
  
    fetchProductos();
  }, []);

  const handleAddToCart = (product) => {
    console.log('Producto añadido:', product);
  };

  return (
    <Container maxWidth="lg" style={{ padding: '20px 0' }}>
      <Grid2 
        container 
        spacing={3} 
        justifyContent="center"
      >
        {productos.map((producto) => (
          <Grid2 
            item 
            key={producto.id} 
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <ProductCard product={producto} onAddToCart={handleAddToCart} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default Home;
