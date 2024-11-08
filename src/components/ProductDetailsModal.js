import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid } from '@mui/material';

const ProductDetailsModal = ({ product, onClose, onAddToCart }) => {
  // Asegurarnos de que `useState` siempre se llame en el mismo orden
  const [selectedSize, setSelectedSize] = useState(product?.tallas?.length > 0 ? product.tallas[0] : null);


  // Si no hay producto, no renderizamos nada, pero siempre ejecutamos el hook
  if (!product) return null;

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart({ ...product, talla: selectedSize }); // El producto con talla seleccionada
      onClose(); // Cerrar el modal
    } else {
      alert('Por favor, selecciona una talla antes de añadir al carrito');
    }
  };
  
  
  
  
  return (
    <Dialog open={Boolean(product)} onClose={onClose}>
      <DialogTitle>{product.nombre}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {product.imagenUrl ? (
              <img 
                src={product.imagenUrl} 
                alt={product.nombre} 
                style={{ width: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <Typography variant="body2" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Imagen no disponible
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">{product.descripcion}</Typography>
            <Typography variant="h6" style={{ marginTop: '16px', color: 'black' }}>${product.precio}</Typography>
            <Typography variant="subtitle1" style={{ marginTop: '16px' }}>Selecciona una talla:</Typography>
            {/* Botones de talla */}
            <div>
              {product.tallas && product.tallas.length > 0 ? (
                product.tallas.map((talla) => (
                  <Button 
                    key={talla} 
                    variant={selectedSize === talla ? 'contained' : 'outlined'}
                    onClick={() => setSelectedSize(talla)} // Establecer la talla seleccionada
                    style={{ margin: '4px' }}
                  >
                    {talla}
                  </Button>
                ))
              ) : (
                <Typography variant="body2" color="error">No hay tallas disponibles</Typography>
              )}
            </div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleAddToCart} 
          color="primary" 
          variant="contained"
          disabled={!selectedSize} // Deshabilitar si no hay talla seleccionada
        >
          Añadir al Carrito
        </Button>
        <Button onClick={onClose} color="secondary">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetailsModal;
