// pages/CheckoutPage.js
import React from 'react';
import CheckoutForm from '../components/CheckoutForm';
import { Container, Typography, Box } from '@mui/material';

const CheckoutPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: { xs: '128px', sm: '128px', md: '60px' }, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Finalizar Pedido
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Completa el formulario con tu información para realizar el pedido.
        </Typography>
      </Box>
      <CheckoutForm />
    </Container>
  );
};

export default CheckoutPage;
