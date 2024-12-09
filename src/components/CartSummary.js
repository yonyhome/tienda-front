import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, TextField, Button } from '@mui/material';
import { applyDiscount } from '../services/utils'; // Importa la función para aplicar el descuento

const CartSummary = ({
  total,
  discountCode,
  setDiscountCode,
  onApplyDiscount, // Función para aplicar el descuento
  setSnackbar,
  setOpenCheckoutDialog,
}) => {
  const [isDiscountApplied, setIsDiscountApplied] = useState(false); // Estado para verificar si ya se aplicó el descuento
  const [appliedDiscount, setAppliedDiscount] = useState(0); // Estado para almacenar el descuento aplicado

  // Recupera el código de descuento al montar el componente
  useEffect(() => {
    const savedDiscountCode = localStorage.getItem('discountCode');
    if (savedDiscountCode) {
      setDiscountCode(savedDiscountCode); // Carga el código guardado
    }
  }, [setDiscountCode]);

  const handleApplyDiscount = () => {
    // Validación del descuento
    const { discount, message, severity } = applyDiscount(discountCode); // Aplica la función de descuento
    if (discount === 0) {
      setSnackbar(message, severity); // Si el código es inválido, muestra el mensaje
      return;
    }

    if (total <= 100000) {
      setSnackbar("El descuento solo se aplica a compras superiores a $100,000.", "warning");
      return;
    }

    // Aplica el descuento y actualiza el subtotal
    setAppliedDiscount(discount);
    setIsDiscountApplied(true);
    setSnackbar(message, severity);

    // Guarda el código de descuento en localStorage para persistencia
    localStorage.setItem('discountCode', discountCode);
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
        Subtotal: <span style={{ float: 'right' }}>${(total * (1 - appliedDiscount)).toLocaleString()}</span>
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

      {/* Botón de aplicar descuento */}
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

      {/* Botón de ir al checkout */}
      <Button
        variant="contained"
        fullWidth
        onClick={() => setOpenCheckoutDialog(true)} // Abre el diálogo
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
