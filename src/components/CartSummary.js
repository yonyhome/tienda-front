import React, { useState } from 'react';
import { Box, Typography, Divider, TextField, Button } from '@mui/material';

const CartSummary = ({
  total,
  discountCode,
  setDiscountCode,
  onApplyDiscount, // Función para aplicar el descuento
  setSnackbar
}) => {
  const [isDiscountApplied, setIsDiscountApplied] = useState(false); // Estado para verificar si ya se aplicó el descuento

  const handleApplyDiscount = () => {
    if (isDiscountApplied) {
        setSnackbar("El descuento solo se aplica a compras superiores a $100,000.", "warning");
      return;
    }

    if (total <= 100000) {
        setSnackbar("Este cupón ya fue aplicado", "warning");
     
      return;
    }

    // Aplica el descuento
    onApplyDiscount();
    setIsDiscountApplied(true);
  };

  return (
    <Box
      sx={{
        padding: 2,
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      {/* Subtotal */}
      <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Subtotal: <span style={{ float: 'right' }}>${total.toLocaleString()}</span>
      </Typography>
      <Divider sx={{ my: 2 }} />

      {/* Mensaje sobre impuestos */}
      <Typography variant="body2" sx={{ mb: 2 }}>
        * Impuestos, envío y descuentos calculados en el checkout.
      </Typography>

      {/* Campo para código de descuento */}
      <TextField
        placeholder="Código exclusivo o tarjeta de regalo"
        value={discountCode}
        onChange={(e) => setDiscountCode(e.target.value)}
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        disabled={isDiscountApplied} // Deshabilitar el campo si ya se aplicó un descuento
      />

      {/* Botones */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleApplyDiscount}
        disabled={!discountCode || isDiscountApplied} // Deshabilitar si no hay código o ya se aplicó el descuento
        sx={{
          backgroundColor: 'black',
          color: 'white',
          mb: 2,
          '&:hover': { backgroundColor: 'white', color: 'black', border: '1px solid black' },
        }}
      >
        {isDiscountApplied ? 'Descuento Aplicado' : 'Aplicar'}
      </Button>
      <Button
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: 'black',
          color: 'white',
          '&:hover': { backgroundColor: 'white', color: 'black', border: '1px solid black' },
        }}
      >
        IR AL CHECKOUT
      </Button>
    </Box>
  );
};

export default CartSummary;
