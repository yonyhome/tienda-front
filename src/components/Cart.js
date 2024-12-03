import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
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
    <div
      style={{
        padding: '20px',
        height: '100%',
        width: '350px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Franja de TUS PRODUCTOS */}
      <Box sx={{ backgroundColor: 'black', padding: '10px' }}>
        <Typography variant="h6" align="center" style={{ color: 'white', fontWeight: 'bold' }}>
          TUS PRODUCTOS
        </Typography>
      </Box>

      <List>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <ListItem
              key={`${item.id}-${item.talla}`}
              alignItems="flex-start"
              style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}
            >
              {/* Imagen del producto */}
              <Box
                component="img"
                src={item.imagenUrl || 'ruta_a_imagen_placeholder.jpg'}
                alt={item.nombre}
                sx={{ width: 96, height: 96, marginRight: 2 }}
              />

              {/* Detalles del producto */}
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  flexGrow: 1,
                }}
              >
                <Typography
                  variant="body1"
                  style={{
                    fontWeight: 'bold',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    marginBottom: '5px',
                  }}
                >
                  {item.nombre}
                </Typography>
                <Typography variant="body2" style={{ marginBottom: '5px' }}>
                  <strong>Precio:</strong> ${item.precio}
                </Typography>
                <Typography variant="body2" style={{ marginBottom: '5px', color: "grey" }}>
                  <strong>Size:</strong> {item.talla || 'No disponible'}
                </Typography>
                <Typography variant="body2" style={{ marginBottom: '5px', color: "grey" }}>
                  <strong>Color:</strong> {item.color || 'No disponible'}
                </Typography>

                {/* Controles de cantidad */}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  style={{
                    backgroundColor: 'black',
                    padding: '0px',
                    borderRadius: '4px',
                  }}
                >
                  <IconButton
                    onClick={() => onUpdateQuantity(item.id, item.talla, -1)}
                    disabled={item.quantity <= 1}
                    style={{ color: 'white' }}
                  >
                    <Remove />
                  </IconButton>
                  <Typography variant="body2" style={{ color: 'white' }}>
                    {item.quantity}
                  </Typography>
                  <IconButton
                    onClick={() => onUpdateQuantity(item.id, item.talla, 1)}
                    style={{ color: 'white' }}
                  >
                    <Add />
                  </IconButton>
                </Box>
                <IconButton
                  onClick={() => onRemoveFromCart(item.id, item.talla)}
                  style={{ color: 'grey' }}
                >
                  <DeleteIcon />
                  <Typography variant="body2">
                    Remover
                  </Typography>
                </IconButton>
                
              </Box>

              {/* Botón para eliminar */}
              <Box display="flex" alignItems="center" marginLeft={2}>
                
              </Box>
            </ListItem>
          ))
        ) : (
          <Typography style={{ textAlign: 'center' }} variant="body2">
            El carrito está vacío.
          </Typography>
        )}
      </List>

      {/* Subtotal con fondo gris */}
      {cartItems.length > 0 && (
        <>
          <Divider style={{ margin: '10px 0' }} />
          <Box sx={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
            <Typography variant="h6" style={{ textAlign: 'right' }}>
              Subtotal: ${total.toFixed(2)}
            </Typography>
          </Box>

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
            sx={{
              backgroundColor: 'black',
              color: 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
          >
            Aplicar
          </Button>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            style={{ marginTop: '10px' }}
            onClick={onEmptyCart}
            sx={{
              backgroundColor: 'black',
              color: 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
          >
            Vaciar Carrito
          </Button>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            style={{ marginTop: '10px' }}
            onClick={handleCheckoutDialogOpen}
            sx={{
              backgroundColor: 'black',
              color: 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
          >
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
            showSnackbar={({ message, severity }) => setSnackbar(message, severity)}
            onEmptyCart={onEmptyCart}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;
