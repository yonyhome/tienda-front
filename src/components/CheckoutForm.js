import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Divider, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { registrarPedido } from '../services/utils';

const CheckoutForm = ({ subtotal, shippingCost, cartItems, onCloseDialog, setSnackbarOpen, onEmptyCart, onCloseCart }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    address: '',
    email: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      nombre: formData.firstName,
      telefono: formData.phoneNumber,
      direccion: formData.address,
      email: formData.email,
      subtotal: subtotal,
      shippingCost: shippingCost,
      total: subtotal + shippingCost,
      fecha: new Date().toLocaleString(),
      productos: cartItems.map((producto) => ({
        ...producto,
        cantidad: producto.quantity,
      })),
    };

    try {
      const isOrderRegistered = await registrarPedido(orderData);

      if (isOrderRegistered) {
        // Mostrar mensaje de éxito
        setSnackbarOpen({
          open: true,
          message: '¡Pedido realizado con éxito! Muy pronto nos contactaremos por WhatsApp para confirmarlo.',
          severity: 'success',
        });

        // Vaciar el carrito y cerrar el diálogo
        onEmptyCart();
        onCloseDialog();
      } else {
        setSnackbarOpen({
          open: true,
          message: 'Hubo un error al realizar el pedido. Por favor, inténtalo nuevamente.',
          severity: 'error',
        });
      }
    } catch (error) {
      setSnackbarOpen({
        open: true,
        message: 'Ocurrió un error inesperado. Por favor, inténtalo más tarde.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const total = subtotal + shippingCost;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 3 }}>
        <TextField
          label="Nombre"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Dirección"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <TextField
          label="Correo Electrónico"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Número Telefónico"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1">Subtotal: ${subtotal.toFixed(2)}</Typography>
        <Typography variant="body1">Envío: ${shippingCost.toFixed(2)}</Typography>
        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Realizar Pedido'}
        </Button>
      </Box>
    </motion.div>
  );
};

export default CheckoutForm;
