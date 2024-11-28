import React from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import ProductImage from './ProductImage';

const ImageCarousel = ({ images, currentImageIndex, handlePrevious, handleNext }) => (
  <Box position="relative" display="flex" justifyContent="center" alignItems="center" sx={{ height: '400px' }}>
    <ProductImage image={images[currentImageIndex]} alt={`Imagen del producto`} />
    {images.length > 1 && (
      <>
        <IconButton
          onClick={handlePrevious}
          sx={{
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
        <IconButton
          onClick={handleNext}
          sx={{
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
);

export default ImageCarousel;
