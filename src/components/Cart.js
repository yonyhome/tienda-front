import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from '@mui/material';
import { Delete as DeleteIcon, Add, Remove } from '@mui/icons-material';
import CheckoutForm from '../components/CheckoutForm';

const Cart = ({ cartItems = [], onRemoveFromCart, onUpdateQuantity, onEmptyCart, onCloseCart }) => {
  const [total, setTotal] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const shippingCost = 10000;

  useEffect(() => {
    const calculateTotal = () => {
      const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);
      const discountedTotal = subtotal * (1 - discount);
      setTotal(discountedTotal);
    };
    calculateTotal();
  }, [cartItems, discount]);

  const handleDiscountApply = () => {
    if (discountCode === 'DESCUENTO10') {
      setDiscount(0.1);
      setSnackbar({ open: true, message: '¡Descuento aplicado correctamente!', severity: 'success' });
    } else {
      setDiscount(0);
      setSnackbar({ open: true, message: 'Código inválido. Intenta nuevamente.', severity: 'error' });
    }
  };

  const handleCheckoutDialogOpen = () => {
    setOpenCheckoutDialog(true);
  };

  const handleCheckoutDialogClose = () => {
    setOpenCheckoutDialog(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div style={{ padding: '20px', width: '350px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h6" align="center" style={{ marginBottom: '20px' }}>
        TUS PRODUCTOS
      </Typography>
      <List>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <ListItem key={`${item.id}-${item.talla}`} alignItems="flex-start">
              <Box display="flex" alignItems="center" width="100%">
                <Box
                  component="img"
                  src={item.imagenUrl || 'ruta_a_imagen_placeholder.jpg'}
                  alt={item.nombre}
                  sx={{ width: 70, height: 70, marginRight: 1 }}
                />
                <ListItemText
                  primary={`${item.nombre} (Talla: ${item.talla || 'No disponible'})`}
                  secondary={`Precio: $${item.precio}`}
                  sx={{ flexGrow: 1 }}
                />
                <IconButton edge="end" onClick={() => onRemoveFromCart(item.id, item.talla)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="flex-start" mt={1} ml={2}>
                <IconButton onClick={() => onUpdateQuantity(item.id, item.talla, -1)} disabled={item.quantity <= 1}>
                  <Remove />
                </IconButton>
                <Typography variant="body2" style={{ margin: '0 8px' }}>
                  {item.quantity}
                </Typography>
                <IconButton onClick={() => onUpdateQuantity(item.id, item.talla, 1)}>
                  <Add />
                </IconButton>
              </Box>
              <Divider style={{ width: '100%', margin: '10px 0' }} />
            </ListItem>
          ))
        ) : (
          <Typography variant="body2">El carrito está vacío.</Typography>
        )}
      </List>
      {cartItems.length > 0 && (
        <>
          <Divider style={{ margin: '10px 0' }} />
          <Typography variant="h6" style={{ textAlign: 'right' }}>
            Subtotal: ${total.toFixed(2)}
          </Typography>
          <Divider style={{ margin: '10px 0' }} />
          <TextField
            variant="outlined"
            placeholder="Código exclusivo o tarjeta de descuento"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleDiscountApply} disabled={!discountCode}>
            Aplicar
          </Button>
          <Button variant="outlined" color="error" fullWidth style={{ marginTop: '10px' }} onClick={onEmptyCart}>
            Vaciar Carrito
          </Button>
          <Button variant="contained" color="secondary" fullWidth style={{ marginTop: '10px' }} onClick={handleCheckoutDialogOpen}>
            IR AL CHECKOUT
          </Button>
        </>
      )}

      {/* Cuadro de diálogo para el checkout */}
      <Dialog open={openCheckoutDialog} onClose={handleCheckoutDialogClose}>
        <DialogTitle>Finalizar Pedido</DialogTitle>
        <DialogContent>
          <CheckoutForm
            subtotal={total}
            shippingCost={shippingCost}
            cartItems={cartItems}
            onCloseDialog={handleCheckoutDialogClose}
            setSnackbarOpen={setSnackbar}
            onEmptyCart={ onEmptyCart}
            onCloseCart = { onCloseCart }
          />
        </DialogContent>
      </Dialog>

      {/* Snackbar para mostrar mensajes de éxito o error */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      
    </div>
  );
};

export default Cart;
