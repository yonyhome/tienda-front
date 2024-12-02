import React from 'react';
import { Box, IconButton, Grid } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import ProductImage from './ProductImage';

const ImageCarousel = ({ images, currentImageIndex, handlePrevious, handleNext, setCurrentImageIndex }) => (
  <Box
    position="relative"
    display="flex"
    flexDirection="column"
    alignItems="center"
    sx={{ width: '100%', height: 'auto', overflow: 'hidden' }}
  >
    {/* Imagen principal */}
    <Box sx={{ height: { xs: '300px', sm: '400px' }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ProductImage
        image={images[currentImageIndex]}
        alt={`Imagen del producto`}
        sx={{
          maxHeight: '100%',
          maxWidth: '100%',
          objectFit: 'cover',
        }}
      />
    </Box>

    {images.length > 1 && (
      <>
        {/* Botones de navegación */}
        <IconButton
          onClick={handlePrevious}
          sx={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            zIndex: 1,
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
            zIndex: 1,
          }}
        >
          <ArrowForward />
        </IconButton>
      </>
    )}

    {/* Miniaturas */}
    <Grid
      container
      spacing={1}
      sx={{
        display: images.length > 1 ? 'flex' : 'none',
        marginTop: '10px',
        justifyContent: 'center',
        overflowX: 'auto',
        width: '100%',
      }}
    >
      {images.map((image, index) => (
        <Grid item key={index}>
          <Box
            sx={{
              width: '60px',
              height: '60px',
              borderRadius: '4px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: currentImageIndex === index ? '2px solid #000' : '1px solid #ddd',
              '&:hover': { border: '2px solid #000' },
            }}
            onClick={() => setCurrentImageIndex(index)}
          >
            <img
              src={image}
              alt={`Miniatura ${index}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default ImageCarousel;
