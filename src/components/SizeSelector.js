import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const SizeSelector = ({ sizes, selectedSize, setSelectedSize }) => (
  <Box>
    {sizes.length > 0 ? (
      sizes.map((size) => (
        <Button
          key={size}
          variant={selectedSize === size ? 'contained' : 'outlined'}
          onClick={() => setSelectedSize(size)}
          sx={{
            m: 0.5,
            backgroundColor: selectedSize === size ? '#000' : 'transparent',
            color: selectedSize === size ? '#FFF' : '#000',
            border: '1px solid #000',
            '&:hover': {
              backgroundColor: '#333',
              color: '#FFF',
            },
          }}
        >
          {size}
        </Button>
      ))
    ) : (
      <Typography variant="body2" color="error" sx={{ mt: 1 }}>
        No hay tallas disponibles.
      </Typography>
    )}
  </Box>
);

export default SizeSelector;
