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
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          cursor: 'pointer',
          border: 'none',
          boxShadow: 'none',
          width: { xs: '100%', sm: '85%', md: '85%' }, // Ajustes de ancho según el tamaño de pantalla
          margin: 'auto',
        }}
      >
        <CardMedia
          component="img"
          image={product.imagenes?.[0] || '/no-photo.jpg'}
          alt={`Imagen del producto ${product.nombre}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/no-photo.jpg';
          }}
          sx={{
            width: '100%',
            height: { xs: '250px', sm: '350px', md: '350px' }, // Altura adaptativa
            objectFit: 'cover',
          }}
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            padding: '10px 0',
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              textAlign: 'left',
              color: '#333',
            }}
          >
            {product.nombre}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'black',
            }}
          >
            $ {product.precio}
          </Typography>
        </CardContent>
      </Card>


      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <Box 
          sx={{ 
            backgroundColor: '#000', 
            color: '#FFF', 
            textAlign: 'center', 
            padding: '1rem', 
            fontSize: '1.25rem', 
            fontWeight: 'bold' 
          }}
        >
          {product.nombre}
        </Box>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box 
                position="relative" 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                sx={{ height: "400px" }} // Ajusta la altura de la imagen
              >
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
                    height: '100%',
                    objectFit: 'cover', // Imagen ocupa todo el espacio
                    borderRadius: '8px', // Esquinas redondeadas
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
                      sx={{
                        m: 0.5,
                        backgroundColor: selectedSize === talla ? '#000' : 'transparent',
                        color: selectedSize === talla ? '#FFF' : '#000',
                        border: '1px solid #000',
                        '&:hover': {
                          backgroundColor: '#333',
                          color: '#FFF',
                        },
                      }}
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
            variant="contained"
            sx={{
              backgroundColor: '#000',
              color: '#FFF',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
            disabled={!selectedSize}
          >
            Añadir al Carrito
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: '#FF5722',
              color: '#FFF',
              '&:hover': {
                backgroundColor: '#E64A19',
              },
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>



    </>
  );
};

export default ProductCard;
