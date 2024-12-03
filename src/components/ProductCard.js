import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import ProductDialog from './ProductDialog';

const COLOR_CODES = {
  rojo: '#FF6961',
  azul: '#77DDFF',
  verde: '#77DD77',
  amarillo: '#FDFD96',
  rosado: '#FFB6C1',
  lila: '#C3B1E1',
  naranja: '#FFB347',
  negro: '#000000',
  blanco: '#FFFFFF',
  gris: '#D3D3D3',
  marrón: '#8B4513',
  beige: '#F5F5DC',
  violeta: '#8A2BE2',
  aqua: '#00FFFF',
  turquesa: '#40E0D0',
  oliva: '#808000',
  coral: '#FF7F50',
  plateado: '#C0C0C0',
  dorado: '#FFD700',
  rosa: '#FFC0CB',
  índigo: '#4B0082',
  mostaza: '#FFDB58',
  café: '#6F4F37',
  lavanda: '#E6E6FA',
  perla: '#F0E6D2',
  celeste: '#87CEEB',
  pistacho: '#93C572',
  terracota: '#E2725B',
  menta: '#98FF98',
  fucsia: '#FF1493',
  malva: '#9B59B6',
  limón: '#F4F100',
  salmón: '#FA8072',
  charcoal: '#36454F',
  azul_oscuro: '#00008B',
  azul_marino: '#000080',
  azul_claro: '#ADD8E6',
  azul_electrico: '#7DF9FF',
  azul_rey: '#4169E1',
  verde_pasto: '#2E8B57',
  verde_lima: '#32CD32',
  verde_bosque: '#228B22',
  verde_esmeralda: '#50C878',
  verde_menta: '#A8E4A0',
  verde_oliva_oscuro: '#556B2F',
  verde_agua: '#B0E0E6',
  verde_militar: '#4B5320',
  gris_oscuro: '#A9A9A9',
  gris_claro: '#D3D3D3',
  gris_plomo: '#BEBEBE',
  morado: '#800080',
  purpura: '#800080',
  lavanda_claro: '#E6E6FA',
  cian: '#00FFFF',
  beige_oscuro: '#F5F5DC',
  marron_claro: '#D2691E',
  marron_oscuro: '#8B4513',
  tierra: '#A52A2A',
  rojo_vino: '#9B111E',
  naranja_claro: '#FF8C00',
  naranja_oscuro: '#FF7F50',
  amarillo_claro: '#FFFF00',
  amarillo_dorado: '#FFD700',
  rosa_fuerte: '#FF1493',
  purpura_claro: '#DDA0DD',
  morado_oscuro: '#4B0082',
  burdeos: '#800020',
};



const ProductCard = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleMouseEnter = () => {
    if (product.imagenes?.length > 1) setCurrentImageIndex(1);
  };

  const handleMouseLeave = () => setCurrentImageIndex(0);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    openDialog(); // Abrir diálogo con talla seleccionada
  };

  return (
    <>
      <Card
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          margin: 'auto',
          cursor: 'pointer',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={openDialog} // Abrir diálogo al hacer clic en cualquier parte
      >
        {/* Imagen del producto */}
        <Box position="relative">
          <img
            src={product.imagenes?.[currentImageIndex] || '/no-photo.jpg'}
            alt={`Imagen de ${product.nombre}`}
            style={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
            }}
          />
          {/* Selector de tallas */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              textAlign: 'center',
              padding: '5px 0',
            }}
            onClick={(e) => e.stopPropagation()} // Evitar que abra el diálogo si se hace clic en las tallas
          >
            {product.tallas?.length > 1 ? (
              product.tallas.map((talla) => (
                <Typography
                  key={talla}
                  onClick={() => handleSizeClick(talla)}
                  sx={{
                    display: 'inline-block',
                    margin: '0 5px',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: selectedSize === talla ? '#77DD77' : 'transparent',
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#99FF99' },
                  }}
                >
                  {talla}
                </Typography>
              ))
            ) : (
              <Button
                onClick={openDialog}
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
              >
                Agregar al Carrito
              </Button>
            )}
          </Box>
        </Box>

        {/* Contenido de la tarjeta */}
        <CardContent sx={{ textAlign: 'left', padding: '10px' }}>
          {/* Nombre del producto */}
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '12px', md: '18px' },
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            {product.nombre}
          </Typography>

          {/* Precios */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { md: 'center' },
              marginBottom: '5px',
            }}
          >
            {product.descuento && (
              <Typography
                sx={{
                  fontSize: { xs: '12px', md: '14px' },
                  textDecoration: 'line-through',
                  color: 'gray',
                  marginRight: { md: '10px' },
                }}
              >
                ${(product.precio / (1 - product.descuento/100)).toFixed(2)}
              </Typography>
            )}
            <Typography
              sx={{
                fontSize: { xs: '14px', md: '16px' },
                fontWeight: 'bold',
                color: 'black',
              }}
            >
              ${product.precio}
            </Typography>
          </Box>

          {/* Colores disponibles */}
          <Box display="flex" alignItems="center" mt={1}>
            {product.colores?.map((color) => (
              <Box
                key={color}
                sx={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: COLOR_CODES[color] || 'gray',
                  marginRight: '5px',
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Diálogo del producto */}
      <ProductDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        product={product}
        onAddToCart={onAddToCart}
        initialSelectedSize={selectedSize} // Pasar la talla seleccionada al diálogo
      />
    </>
  );
};

export default ProductCard;
