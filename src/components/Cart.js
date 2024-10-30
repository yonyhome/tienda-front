import React from 'react';
import { List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const Cart = ({ cartItems = [], onRemoveFromCart }) => { // Inicializa cartItems como un array vacío por defecto
  return (
    <div style={{ padding: '20px', width: '300px' }}>
      <Typography variant="h6">Carrito de Compras</Typography>
      <List>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <ListItem 
              key={item.id} 
              secondaryAction={
                <IconButton edge="end" onClick={() => onRemoveFromCart(item.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary={item.nombre} secondary={`Precio: $${item.precio}`} />
            </ListItem>
          ))
        ) : (
          <Typography variant="body2">El carrito está vacío.</Typography>
        )}
      </List>
    </div>
  );
};

export default Cart;
