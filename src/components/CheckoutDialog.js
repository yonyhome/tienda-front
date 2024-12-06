import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import CheckoutForm from './CheckoutForm';

const CheckoutDialog = ({ open, onClose, subtotal, shippingCost, cartItems, showSnackbar, onEmptyCart }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Finalizar Pedido</DialogTitle>
    <DialogContent>
      <CheckoutForm
        subtotal={subtotal}
        shippingCost={shippingCost}
        cartItems={cartItems}
        onCloseDialog={onClose}
        showSnackbar={showSnackbar}
        onEmptyCart={onEmptyCart}
      />
    </DialogContent>
  </Dialog>
);

export default CheckoutDialog;
