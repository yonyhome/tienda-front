import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Divider, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Delete as DeleteIcon, Add, Remove } from '@mui/icons-material';
import CheckoutForm from '../components/CheckoutForm'; // Asegúrate de que CheckoutForm esté disponible

const Cart = ({ cartItems = [], onRemoveFromCart, onUpdateQuantity }) => {
  const [total, setTotal] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false); // Estado para controlar el cuadro de diálogo

  const shippingCost = 10000; // Costo fijo de envío

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
      setDiscount(0.1); // Descuento del 10%
    } else {
      setDiscount(0); // Sin descuento si el código no es válido
    }
  };

  const handleEmptyCart = () => {
    cartItems.forEach((item) => onRemoveFromCart(item.id, item.talla)); // Eliminar todos los productos
  };

  const handleCheckoutDialogOpen = () => {
    setOpenCheckoutDialog(true); // Abrir el cuadro de diálogo de checkout
  };

  const handleCheckoutDialogClose = () => {
    setOpenCheckoutDialog(false); // Cerrar el cuadro de diálogo de checkout
  };

  return (
    <div style={{ padding: '20px', width: '350px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h6" align="center" style={{ marginBottom: '20px' }}>TUS PRODUCTOS</Typography>
      <List>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <ListItem key={`${item.id}-${item.talla}`} alignItems="flex-start">
              <Box display="flex" alignItems="center" width="100%">
                <Box component="img" 
                     src={item.imagenUrl || 'ruta_a_imagen_placeholder.jpg'} 
                     alt={item.nombre} 
                     sx={{ width: 70, height: 70, marginRight: 1 }} />
                <ListItemText
                  primary={`${item.nombre} (Talla: ${item.talla ? item.talla : 'No disponible'})`}
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
                <Typography variant="body2" style={{ margin: '0 8px' }}>{item.quantity}</Typography>
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
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={handleDiscountApply}
            disabled={!discountCode}
          >
            Aplicar
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            fullWidth 
            style={{ marginTop: '10px' }} 
            onClick={handleEmptyCart}
          >
            Vaciar Carrito
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            fullWidth 
            style={{ marginTop: '10px' }}
            onClick={handleCheckoutDialogOpen} // Llama a la función para abrir el cuadro de diálogo de checkout
          >
            IR AL CHECKOUT
          </Button>
        </>
      )}

      {/* Cuadro de diálogo para el checkout */}
      <Dialog open={openCheckoutDialog} onClose={handleCheckoutDialogClose}>
        <DialogTitle>Finalizar Pedido</DialogTitle>
        <DialogContent>
          <CheckoutForm subtotal={total} shippingCost={shippingCost} /> {/* Pasamos el subtotal y el costo de envío como props */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCheckoutDialogClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Cart;
