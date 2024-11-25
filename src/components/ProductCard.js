import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Box } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
const ProductCard = ({ product, onAddToCart }) => {
  const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product?.tallas?.[0] || null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleOpen = () => {
    setSelectedSize(product?.tallas?.[0] || null); // Restablecer talla al abrir modal
    setOpen(true);
  };
  
  const handleClose = () => setOpen(false);
  const handlePrevious = (e) => {
    e.stopPropagation(); // Para evitar abrir el modal al hacer clic en los botones
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.imagenes.length - 1 : prevIndex - 1
    );
  };
  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.imagenes.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handleAddToCart = () => {
    if (selectedSize) {
      const productWithSize = { ...product, talla: selectedSize };
      onAddToCart(productWithSize, selectedSize);
      handleClose();
    } else {
      alert('Por favor, selecciona una talla antes de añadir al carrito');
    }
  };
  
  return (
    <>
      <Card
        onClick={handleOpen}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <CardMedia
          component="img"
          height="190"
          image={product.imagenes?.[0] || '/no-photo.jpg'}
          alt={`Imagen del producto ${product.nombre}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/no-photo.jpg';
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            
          >
            {product.nombre}
          </Typography>
          <Typography
            variant="h6"
           
          >
            $ {product.precio}
          </Typography>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{product.nombre}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box position="relative" display="flex" justifyContent="center" alignItems="center">
                <CardMedia
                  component="img"
                  image={product.imagenes?.[currentImageIndex] || '/no-photo.jpg'}
                  alt={`Imagen del producto ${product.nombre}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/no-photo.jpg';
                  }}
                  style={{
                    width: '100%',
                    maxHeight: '300px',
                    objectFit: 'contain',
                  }}
                />

                {product.imagenes?.length > 1 && (
                  <>
                    {/* Botón Anterior */}
                    <IconButton
                      onClick={handlePrevious}
                      style={{
                        position: 'absolute',
                        left: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                      }}
                    >
                      <ArrowBack />
                    </IconButton>

                    {/* Botón Siguiente */}
                    <IconButton
                      onClick={handleNext}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                      }}
                    >
                      <ArrowForward />
                    </IconButton>
                  </>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2">
                {product.descripcion || 'Sin descripción disponible.'}
              </Typography>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Selecciona una talla:
              </Typography>
              <Box>
                {product.tallas?.length > 0 ? (
                  product.tallas.map((talla) => (
                    <Button
                      key={talla}
                      variant={selectedSize === talla ? 'contained' : 'outlined'}
                      onClick={() => setSelectedSize(talla)}
                      sx={{ m: 0.5 }}
                    >
                      {talla}
                    </Button>
                  ))
                ) : (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    No hay tallas disponibles.
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAddToCart}
            color="primary"
            variant="contained"
            disabled={!selectedSize}
          >
            Añadir al Carrito
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default ProductCard;
