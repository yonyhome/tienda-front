import React from 'react';
import { CardMedia } from '@mui/material';

const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = '/no-photo.jpg';
};

const ProductImage = ({ image, alt, onError }) => (
  <CardMedia
    component="img"
    image={image}
    alt={alt}
    onError={onError || handleImageError}
    sx={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '8px',
    }}
  />
);

export default ProductImage;
