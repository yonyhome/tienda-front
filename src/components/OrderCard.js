// OrderCard.js
import React from 'react';
import { Paper, Typography, Divider, Box, IconButton } from '@mui/material';
import Timeline from './Timeline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HelpIcon from '@mui/icons-material/Help';
import DoneIcon from '@mui/icons-material/Done';  // Nuevo ícono para "Entregado"

const OrderCard = ({ order }) => {
  return (
    <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <LocalShippingIcon sx={{ fontSize: 30, marginRight: 1 }} />
        <Box>
          {order.status !== 4 ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Entrega estimada: 3-4 días hábiles
                </Typography>
                <IconButton size="small" color="primary">
                  <HelpIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
              <Typography variant="body2" color="textSecondary">
                Destino: {order.address}
              </Typography>
            </>
          ) : (
            <>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'green' }}>
                    Pedido entregado
                    </Typography>
                    <DoneIcon sx={{ fontSize: 30, color: 'green', marginRight: 1 }} />
                </Box>
                <Typography variant="body2" color="textSecondary">
                    Destino: {order.address}
                </Typography>
             
            </>
          )}
        </Box>
      </Box>

      <Typography variant="body2" color="textSecondary" gutterBottom>
        Fecha de Orden: {new Date(order.date).toLocaleDateString()}
      </Typography>
      
      <Divider sx={{ margin: '16px 0' }} />

      <Timeline currentStatus={order.status} />
    </Paper>
  );
};

export default OrderCard;

