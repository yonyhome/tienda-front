// CategoryCards.js
import React from 'react';
import { Box, Card, CardMedia, Button } from '@mui/material';

const categories = [
  {
    image: '/men.webp', // Reemplaza con las rutas de tus imágenes
    label: 'Hombres',
    link: '/hombre',
  },
  {
    image: '/womens.webp',
    label: 'Mujeres',
    link: '/mujer',
  },
  {
    image: '/accesorios.jpg',
    label: 'Accesorios',
    link: '/accesorios',
  },
];

const CategoryCards = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // Columnas en pantallas pequeñas, fila en pantallas grandes
        justifyContent: { xs: 'flex-start', md: 'space-between' },
        alignItems: 'center',
        height: { xs: 'auto', md: '80vh' }, // Altura auto en pantallas pequeñas, 80% en grandes
        padding: '10px',
      }}
    >
      {categories.map((category, index) => (
        <Card
          key={index}
          sx={{
            position: 'relative',
            width: { xs: '100%', md: '32%' }, // Ancho 100% en pantallas pequeñas, 32% en pantallas grandes
            height: { xs: '60vh', md: '100%' }, // Ajusta la altura en pantallas pequeñas
            marginBottom: { xs: '10px', md: 0 }, // Espaciado entre tarjetas en pantallas pequeñas
            overflow: 'hidden',
            borderRadius: '8px',
          }}
        >
          <CardMedia
            component="img"
            image={category.image}
            alt={category.label}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Button
            href={category.link}
            variant="contained"
            sx={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'black',
              color: 'white',
              padding: '10px 20px',
              '&:hover': {
                backgroundColor: 'white',
                color: "black"
              },
            }}
          >
            {category.label}
          </Button>
        </Card>
      ))}
    </Box>
  );
};

export default CategoryCards;
