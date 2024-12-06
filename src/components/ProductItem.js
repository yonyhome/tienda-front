import React from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import { Delete as DeleteIcon, Add, Remove } from '@mui/icons-material';

const ProductItem = ({ item, onUpdateQuantity, onRemoveFromCart }) => (
  <Box
    component="li"
    key={`${item.id}-${item.talla}`}
    alignItems="flex-start"
    style={{
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '10px',
      position: 'relative',
      padding: '15px',
      paddingBottom: '40px', // Asegura espacio para el precio
    }}
  >
    <Box
      component="img"
      src={item.imagenUrl || 'ruta_a_imagen_placeholder.jpg'}
      alt={item.nombre}
      sx={{ width: 96, height: 96, marginRight: 2 }}
    />

    <Box style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Typography
        variant="body1"
        style={{
          fontWeight: 'bold',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          marginBottom: '5px',
        }}
      >
        {item.nombre}
      </Typography>
      <Typography variant="body2" style={{ marginBottom: '5px', color: 'grey' }}>
        <strong>Size:</strong> {item.talla || 'No disponible'}
      </Typography>
      {item.color && (
        <Typography variant="body2" style={{ marginBottom: '5px', color: 'grey' }}>
          <strong>Color:</strong> {item.color}
        </Typography>
      )}

      <Box
        display="flex"
        alignItems="center"
        style={{
          backgroundColor: 'black',
          borderRadius: '4px',
          maxWidth: '80px',
          height: '32px',
        }}
      >
        <IconButton
          onClick={() => onUpdateQuantity(item.id, item.talla, item.color, -1)}
          style={{ color: 'white' }}
          disabled={item.quantity <= 1}
        >
          <Remove style={{ fontSize: '16px' }} />
        </IconButton>
        <Typography variant="body2" style={{ color: 'white', margin: '0 4px' }}>
          {item.quantity}
        </Typography>
        <IconButton
          onClick={() => onUpdateQuantity(item.id, item.talla, item.color, 1)}
          style={{ color: 'white' }}
        >
          <Add style={{ fontSize: '16px' }} />
        </IconButton>
      </Box>

      <Box display="flex" alignItems="center" alignContent={"flex-start"}>
        <IconButton onClick={() => onRemoveFromCart(item.id, item.talla, item.color)} style={{ color: 'grey', padding: "0px" }}>
          <DeleteIcon />
        </IconButton>
        <Typography variant="body2" style={{ color: 'grey', padding: "0px", fontSize: '13px'}}>
          Remover
        </Typography>
      </Box>
    </Box>

    <Box
      style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        textAlign: 'right',
      }}
    >
      <Typography variant="body2" style={{ fontSize: '14px', color: 'grey' }}>
        {/* Formato con separador de miles y sin decimales */}
        ${Intl.NumberFormat("es-CO").format(Math.round(item.precio * item.quantity))}
      </Typography>
      <Divider style={{ margin: '10px 0' }} />
    </Box>

  </Box>
);

export default ProductItem;
