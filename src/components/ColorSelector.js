import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const ColorSelector = ({ colors, selectedColor, setSelectedColor }) => (
  <Box>
    {colors.length > 0 ? (
      colors.map((color) => (
        <Button
          key={color}
          variant={selectedColor === color ? 'contained' : 'outlined'}
          onClick={() => setSelectedColor(color)}
          sx={{
            m: 0.5,
            backgroundColor: selectedColor === color ? '#000' : 'transparent',
            color: selectedColor === color ? '#FFF' : '#000',
            border: '1px solid #000',
            '&:hover': {
              backgroundColor: '#333',
              color: '#FFF',
            },
          }}
        >
          {color}
        </Button>
      ))
    ) : (
      <Typography variant="body2" color="error" sx={{ mt: 1 }}>
        No hay colores disponibles.
      </Typography>
    )}
  </Box>
);

export default ColorSelector;
