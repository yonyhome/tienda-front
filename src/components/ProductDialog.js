import React, { useState, useCallback, useEffect } from 'react';
import { Dialog, DialogContent, DialogActions, Box, Typography, Button } from '@mui/material';
import ImageCarousel from './ImageCarousel';
import SizeSelector from './SizeSelector';
import ColorSelector from './ColorSelector';

const ProductDialog = ({ open, onClose, product, onAddToCart, initialSelectedSize, initialSelectedColor }) => {
  const [selectedSize, setSelectedSize] = useState(initialSelectedSize || product?.tallas?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(initialSelectedColor || product?.colores?.[0] || null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Actualizar selección inicial cuando cambian las props
  useEffect(() => {
    setSelectedSize(initialSelectedSize || product?.tallas?.[0] || null);
    setSelectedColor(initialSelectedColor || product?.colores?.[0] || null);
  }, [initialSelectedSize, initialSelectedColor, product]);

  const handlePrevious = useCallback(
    (e) => {
      e.stopPropagation();
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product.imagenes.length - 1 : prevIndex - 1
      );
    },
    [product.imagenes.length]
  );

  const handleNext = useCallback(
    (e) => {
      e.stopPropagation();
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.imagenes.length - 1 ? 0 : prevIndex + 1
      );
    },
    [product.imagenes.length]
  );

  const handleAddToCart = useCallback(() => {
    if (selectedSize && selectedColor) {
      const productWithOptions = { ...product, talla: selectedSize, color: selectedColor };
      onAddToCart(productWithOptions, selectedSize, selectedColor);
      onClose();
    } else {
      alert('Por favor, selecciona una talla y un color antes de añadir al carrito');
    }
  }, [selectedSize, selectedColor, product, onAddToCart, onClose]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Nombre del producto */}
      <Box
        sx={{
          backgroundColor: '#000',
          color: '#FFF',
          textAlign: 'center',
          padding: '1rem',
          fontSize: '1.25rem',
          fontWeight: 'bold',
        }}
      >
        {product.nombre}
      </Box>

      <DialogContent dividers>
        {/* Carrusel de imágenes */}
        <ImageCarousel
          images={product.imagenes}
          currentImageIndex={currentImageIndex}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />

        {/* Descripción del producto */}
        <Typography variant="body1" sx={{ mt: 2 }}>
          {product.descripcion || 'Sin descripción disponible.'}
        </Typography>

        {/* Selector de tallas */}
        <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold"}}>
          Selecciona una talla:
        </Typography>
        <SizeSelector sizes={product.tallas} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />

        {/* Selector de colores */}
        <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
          Selecciona un color:
        </Typography>
        <ColorSelector colors={product.colores} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
      </DialogContent>

      {/* Botones de acción */}
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
          disabled={!selectedSize || !selectedColor}
        >
          Añadir al Carrito
        </Button>
        <Button
          onClick={onClose}
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
  );
};

export default ProductDialog;
