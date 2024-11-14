import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Divider, CircularProgress } from '@mui/material';
import { Person, Email, LocationOn, Phone } from '@mui/icons-material'; // Iconos utilizados
import { motion } from 'framer-motion'; // Asegúrate de que framer-motion esté instalado
import { registrarPedido } from '../services/utils'; // Importa la función de registro de pedido

const CheckoutForm = ({ subtotal, shippingCost }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    address: '',
    email: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Activamos el estado de carga

    // Crea un objeto con los datos del pedido
    const orderData = {
      nombre: formData.firstName,
      telefono: formData.phoneNumber,
      direccion: formData.address,
      email: formData.email,
      subtotal: subtotal,
      shippingCost: shippingCost,
      total: subtotal + shippingCost,
      fecha: new Date().toLocaleString(),
    };

    // Llama a la función para registrar el pedido
    const isOrderRegistered = await registrarPedido(orderData);

    setLoading(false);

    if (isOrderRegistered) {
      console.log('Pedido enviado:', orderData);
      alert('¡Pedido realizado con éxito! Te contactaremos pronto para confirmar.');
    } else {
      alert('Hubo un error al realizar el pedido. Por favor, inténtalo nuevamente.');
    }
  };

  const total = subtotal + shippingCost;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 3,
          backgroundColor: '#f9f9f9',
          borderRadius: 2,
          boxShadow: 3,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)'
          }
        }}
      >
        <Typography variant="h6" color="primary" sx={{ mb: 2, textAlign: 'center' }}>
          ¡Finaliza tu Pedido!
        </Typography>

        <TextField
          label="Nombre"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
          sx={{ '& .MuiInputBase-root': { backgroundColor: '#fff' } }}
          InputProps={{
            startAdornment: (
              <Person sx={{ color: 'primary.main', marginRight: 1 }} />
            )
          }}
        />
        <TextField
          label="Dirección"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          sx={{ '& .MuiInputBase-root': { backgroundColor: '#fff' } }}
          InputProps={{
            startAdornment: (
              <LocationOn sx={{ color: 'primary.main', marginRight: 1 }} />
            )
          }}
        />
        <TextField
          label="Correo Electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          sx={{ '& .MuiInputBase-root': { backgroundColor: '#fff' } }}
          InputProps={{
            startAdornment: (
              <Email sx={{ color: 'primary.main', marginRight: 1 }} />
            )
          }}
        />
        <TextField
          label="Número Telefónico"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          sx={{ '& .MuiInputBase-root': { backgroundColor: '#fff' } }}
          InputProps={{
            startAdornment: (
              <Phone sx={{ color: 'primary.main', marginRight: 1 }} />
            )
          }}
        />

        <Divider sx={{ my: 2 }} />

        <Typography variant="body1">Subtotal: ${subtotal.toFixed(2)}</Typography>
        <Typography variant="body1">Envío: ${shippingCost.toFixed(2)}</Typography>
        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 2,
            padding: '12px',
            borderRadius: 3,
            '&:hover': { backgroundColor: '#005BB5' }
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Realizar Pedido'
          )}
        </Button>

        {loading && (
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
            Estamos procesando tu pedido...
          </Typography>
        )}

        {!loading && (
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ mt: 2, fontStyle: 'italic' }}
          >
            Te contactaremos para confirmar tu pedido y coordinar el envío.
          </Typography>
        )}
      </Box>
    </motion.div>
  );
};

export default CheckoutForm;
