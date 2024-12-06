import React, { useState, useEffect } from 'react';
import { List, Typography, Box } from '@mui/material';
import ProductItem from './ProductItem';
import CartSummary from './CartSummary';
import CheckoutDialog from './CheckoutDialog';
import { calculateTotal, applyDiscount } from '../services/utils';

const Cart = ({ cartItems, onRemoveFromCart, onUpdateQuantity, onEmptyCart, setSnackbar }) => {
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
    setSnackbar(message, severity);
  };

  return (
    <Box sx={{ padding: '15px', width: '350px', height: '100%' }}>
      <Box sx={{ backgroundColor: 'black', padding: '10px' }}>
        <Typography variant="h6" align="center" style={{ color: 'white', fontWeight: 'bold' }}>
          TUS PRODUCTOS
        </Typography>
      </Box>
      <List>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <ProductItem
              key={`${item.id}-${item.talla}`}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveFromCart={onRemoveFromCart}
            />
          ))
        ) : (
          <Typography style={{ textAlign: 'center' }} variant="body2">
            El carrito está vacío.
          </Typography>
        )}
      </List>
      {cartItems.length > 0 && (
        <CartSummary
          total={total}
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          onApplyDiscount={handleDiscountApply}
          onEmptyCart={onEmptyCart}
          onCheckout={() => setOpenCheckoutDialog(true)}
          setSnackbar={setSnackbar}
        />
      )}
      <CheckoutDialog
        open={openCheckoutDialog}
        onClose={() => setOpenCheckoutDialog(false)}
        subtotal={total}
        shippingCost={shippingCost}
        cartItems={cartItems}
        showSnackbar={setSnackbar}
        onEmptyCart={onEmptyCart}
      />
    </Box>
  );
};

export default Cart;
