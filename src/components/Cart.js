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
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { Delete as DeleteIcon, Add, Remove } from '@mui/icons-material';
import CheckoutForm from '../components/CheckoutForm';
import { applyDiscount, calculateTotal } from '../services/utils';

const Cart = ({ cartItems = [], onRemoveFromCart, onUpdateQuantity, onEmptyCart, setSnackbar }) => {
  const [total, setTotal] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false);
  const shippingCost = 10000;

  useEffect(() => {
    setTotal(calculateTotal(cartItems, discount));
  }, [cartItems, discount]);

  const handleDiscountApply = () => {
    const { discount, message, severity } = applyDiscount(discountCode);
    setDiscount(discount);
    setSnackbar(message, severity); // Usar la función global para mostrar el mensaje
  };

  const handleCheckoutDialogOpen = () => {
    setOpenCheckoutDialog(true);
  };

  const handleCheckoutDialogClose = () => {
    setOpenCheckoutDialog(false);
  };

  return (
    <div style={{ padding: '20px', height: "100%", width: '350px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
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
          <Typography style={{alignContent:"center", }} variant="body2">El carrito está vacío.</Typography>
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

      <Dialog open={openCheckoutDialog} onClose={handleCheckoutDialogClose}>
        <DialogTitle>Finalizar Pedido</DialogTitle>
        <DialogContent>
        <CheckoutForm
          subtotal={total}
          shippingCost={shippingCost}
          cartItems={cartItems}
          onCloseDialog={handleCheckoutDialogClose}
          showSnackbar={({ message, severity }) =>
            setSnackbar( message, severity )
          } // Aquí ajustamos para asegurarnos de que solo se envía el mensaje y severidad.
          onEmptyCart={onEmptyCart}
        />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;
