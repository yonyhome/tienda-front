import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Divider,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { registrarPedido } from '../services/utils';

const formatCurrency = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);

const CheckoutDialog = ({ open, onClose, subtotal, shippingCost, cartItems, showSnackbar, onEmptyCart }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    address: '',
    email: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false);

  const isMobile = useMediaQuery('(max-width:600px)'); // Detecta pantallas pequeñas

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
      action: "registrarPedido",
      nombre: formData.firstName,
      telefono: formData.phoneNumber,
      direccion: formData.address,
      email: formData.email,
      subtotal,
      shippingCost,
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
        showSnackbar(
          '¡Pedido realizado con éxito! Muy pronto nos contactaremos por WhatsApp para confirmarlo.',
          'success'
        );
        onEmptyCart();
        onClose();
      } else {
        showSnackbar(
          'Hubo un error al realizar el pedido. Por favor, inténtalo nuevamente.',
          'error'
        );
      }
    } catch (error) {
      showSnackbar(
        'Ocurrió un error inesperado. Por favor, inténtalo más tarde.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  const total = subtotal + shippingCost;
  console.log(cartItems)
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          backgroundColor: '#1e1e1e',
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        Finaliza tu Compra
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: '#1e1e1e',
          padding: isMobile ? '20px' : '40px',
          color: '#fff',
        }}
      >
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Nombre"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Ingresa tu nombre completo"
              autoComplete="name"
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{
                sx: { borderRadius: '8px', backgroundColor: '#2e2e2e', color: '#fff' },
              }}
            />
            <TextField
              label="Dirección"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Ingresa tu dirección completa"
              autoComplete="address"
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{
                sx: { borderRadius: '8px', backgroundColor: '#2e2e2e', color: '#fff' },
              }}
            />
            <TextField
              label="Correo Electrónico"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="ejemplo@correo.com"
              autoComplete="email"
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{
                sx: { borderRadius: '8px', backgroundColor: '#2e2e2e', color: '#fff' },
              }}
            />
            <TextField
              label="Número Telefónico"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="Ingresa tu número de contacto"
              autoComplete="tel"
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{
                sx: { borderRadius: '8px', backgroundColor: '#2e2e2e', color: '#fff' },
              }}
            />

            <Divider sx={{ borderColor: '#555', my: 2 }} />

            <Box>
              
              {cartItems.map((item) => (
                <Typography
                  key={item.id}
                  variant="body2"
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 1,
                    color: '#ccc',
                  }}
                >
                  {item.nombre} (Size: {item.talla}) x{item.quantity}
                </Typography>
              ))}
            </Box>

            <Typography variant="body1" sx={{ color: '#bbb', display: 'flex', justifyContent: 'space-between' }}>
              🛍️ Subtotal: <span>{formatCurrency(subtotal)}</span>
            </Typography>
            <Typography variant="body1" sx={{ color: '#bbb', display: 'flex', justifyContent: 'space-between' }}>
              🚚 Envío: <span>{formatCurrency(shippingCost)}</span>
            </Typography>
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
              💵 Total: <span>{formatCurrency(total)}</span>
            </Typography>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: '#444',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '8px',
                '&:hover': { backgroundColor: '#666' },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : <>✔ Realizar Pedido</>}
            </Button>
          </Box>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
