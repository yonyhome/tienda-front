import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid2 } from '@mui/material';

const ProductCard = ({ product, onAddToCart }) => {
  const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product?.tallas?.[0] || 'N/A'); // Predeterminar a la primera talla si existe

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Validar que se haya seleccionado una talla antes de añadir al carrito
  const handleAddToCart = () => {
    if (selectedSize) {
      // Asegúrate de que el producto se esté pasando con la talla correctamente
      const productWithSize = { ...product, talla: selectedSize };
      onAddToCart(productWithSize); // Pasar el producto con la talla seleccionada
      handleClose(); // Cerrar el modal
    } else {
      alert('Por favor, selecciona una talla antes de añadir al carrito');
    }
  };
  

  return (
    <>
      <Card 
        onClick={handleOpen} 
        style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', cursor: 'pointer' }}
      >
        <div style={{ width: '100%', height: '200px', position: 'relative' }}>
          {product.imagenes && product.imagenes.length > 0 ? (
            <img 
              src={product.imagenes[0]} 
              alt={product.nombre} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          ) : (
            <Typography 
              variant="body2" 
              style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              Imagen no disponible
            </Typography>
          )}
        </div>

        <CardContent style={{ textAlign: 'center' }}>
          <Typography variant="h6">{product.nombre}</Typography>
          <Typography variant="h6" style={{ color: 'black' }}>${product.precio}</Typography>
        </CardContent>
      </Card>

      {/* Modal de detalles del producto */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{product.nombre}</DialogTitle>
        <DialogContent dividers>
          <Grid2 container spacing={2}>
            <Grid2 item xs={12} sm={6}>
              {product.imagenes && product.imagenes.length > 0 ? (
                <img 
                  src={product.imagenes[0]} 
                  alt={product.nombre} 
                  style={{ width: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <Typography 
                  variant="body2" 
                  style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  Imagen no disponible
                </Typography>
              )}
            </Grid2>
            <Grid2 item xs={12} sm={6}>
              <Typography variant="body2">{product.descripcion}</Typography>
              <Typography variant="h6" style={{ marginTop: '16px', color: 'black' }}>${product.precio}</Typography>
              <Typography variant="subtitle1" style={{ marginTop: '16px' }}>Selecciona una talla:</Typography>
              {/* Tamaños y botón para añadir al carrito */}
              <div>
                {product.tallas.map((talla) => (
                  <Button 
                    key={talla} 
                    variant={selectedSize === talla ? 'contained' : 'outlined'}
                    onClick={() => setSelectedSize(talla)} // Actualizar la talla seleccionada
                    style={{ margin: '4px' }}
                  >
                    {talla}
                  </Button>
                ))}
              </div>
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleAddToCart} // Usar la nueva función que valida la talla seleccionada
            color="primary" 
            variant="contained"
          >
            Añadir al Carrito
          </Button>
          <Button onClick={handleClose} color="secondary">Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductCard;
