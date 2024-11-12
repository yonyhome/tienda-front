import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';

const ProductCard = ({ product, onAddToCart }) => {
  const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product?.tallas?.[0] || 'N/A'); // Talla predeterminada

  const handleOpen = () => {
    setSelectedSize(product?.tallas?.[0] || 'N/A'); // Restablecer a la primera talla al abrir el modal
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // Validar que se haya seleccionado una talla antes de añadir al carrito
  const handleAddToCart = () => {
    if (selectedSize) {
      // Incluir la talla seleccionada en el producto
      const productWithSize = { ...product, talla: selectedSize };
      onAddToCart(productWithSize, selectedSize); // Pasar el producto y la talla seleccionada
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
        <CardMedia
          component="img"
          height="190"
          image={product.imagenes && product.imagenes.length > 0 ? product.imagenes[0] : '/no-photo.jpg'}
          alt="Imagen del producto"
          onError={(e) => {
            e.target.onerror = null;  // Previene bucles de error
            e.target.src = '/no-photo.jpg';  // Fallback a la imagen por defecto
          }}
        />

        <CardContent>
          {/* Título del producto */}
          <Typography 
            gutterBottom 
            variant="h5" 
            component="div"
            sx={{
              fontWeight: 'bold',   // Negrita
              fontFamily: 'Helvetica, Helvetica Neue, Arial, Lucida Grande, sans-serif',  // Fuente personalizada
            }}
          >
            {product.nombre}
          </Typography>

          {/* Precio del producto */}
          <Typography 
            variant="h6" 
            sx={{
              fontWeight: 'bold',   // Negrita
              fontFamily: 'Helvetica, Helvetica Neue, Arial, Lucida Grande, sans-serif',  // Fuente personalizada
            }}
          >
            $ {product.precio}
          </Typography>
        </CardContent>
      </Card>

      {/* Modal de detalles del producto */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{product.nombre}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={1}>
            <CardMedia
              component="img"
              height="100%"
              image={product.imagenes && product.imagenes.length > 0 ? product.imagenes[0] : '/no-photo.jpg'}
              alt="Imagen del producto"
              onError={(e) => {
                e.target.onerror = null;  // Previene bucles de error
                e.target.src = '/no-photo.jpg';  // Fallback a la imagen por defecto
              }}
            />
            <Grid item xs={12} sm={6}>
              <Typography variant="body2">{product.descripcion}</Typography>

              {/* Precio del producto en el modal */}
              <Typography 
                variant="h6" 
                style={{ marginTop: '16px', color: 'black' }}
                sx={{
                  fontWeight: 'bold',  // Negrita
                  fontFamily: 'Helvetica, Helvetica Neue, Arial, Lucida Grande, sans-serif',  // Fuente personalizada
                }}
              >
                $ {product.precio}
              </Typography>

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
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleAddToCart} // Usar la función que valida la talla seleccionada
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
