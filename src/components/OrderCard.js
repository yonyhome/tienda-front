import React from 'react';
import { Paper, Typography, Divider, Box, IconButton } from '@mui/material';
import Timeline from './Timeline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HelpIcon from '@mui/icons-material/Help';
import DoneIcon from '@mui/icons-material/Done';
import { parse, format } from 'date-fns'; // Importamos parse y format
import { es } from 'date-fns/locale'; // Para manejar el idioma español

const OrderCard = ({ order }) => {
  const estadoMap = {
    "por confirmar": 0,
    "confirmado": 1,
    "empacando": 2,
    "despachado": 3,
    "entregado": 4,
  };

  const currentStatus = estadoMap[order.estado] ?? 0;

  // Parseamos la fecha con el formato específico
  const parsedDate = parse(order.fecha, "dd/MM/yyyy, h:mm:ss a", new Date(), { locale: es });

  // Formateamos la fecha para mostrar solo el día, mes y año
  const formattedDate = format(parsedDate, "dd 'de' MMMM 'de' yyyy", { locale: es });

  return (
    <Paper elevation={3} sx={{ padding: '16px', marginBottom: '16px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <LocalShippingIcon sx={{ fontSize: 30, marginRight: 1 }} />
        <Box>
          {currentStatus !== 4 ? (
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
                Destino: {order.direccion}
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
                Destino: {order.direccion}
              </Typography>
            </>
          )}
        </Box>
      </Box>

      <Typography variant="body1" gutterBottom>
        <strong>Destinatario:</strong> {order.nombre || 'Desconocido'}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Total del Pedido:</strong> ${order.total ? order.total.toLocaleString() : 'No disponible'}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Fecha de Orden: {formattedDate}
      </Typography>
      
      <Divider sx={{ margin: '16px 0' }} />

      <Timeline currentStatus={currentStatus} />
    </Paper>
  );
};

export default OrderCard;
