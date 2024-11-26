// TimelineStation.js
import React from 'react';
import { Box, Typography } from "@mui/material";
import { CheckCircle, Schedule, LocalShipping, Done, AccessTime } from '@mui/icons-material';

const stationIcons = [
  <Schedule sx={{ fontSize: 50 }} />,
  <CheckCircle sx={{ fontSize: 50 }} />,
  <LocalShipping sx={{ fontSize: 50 }} />,
  <AccessTime sx={{ fontSize: 50 }} />,
  <Done sx={{ fontSize: 50 }} />
];

const stationLabels = [
  "Por Confirmar", 
  "Confirmado", 
  "Empacando", 
  "Despachado", 
  "Entregado"
];

const TimelineStation = ({ currentStatus, index }) => {
  const isActive = index <= currentStatus;
  const isCompleted = index < currentStatus;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
      <Box
        sx={{
          width: '40px', // Ajusta el tamaño del icono si lo necesitas
          height: '40px',
          borderRadius: '50%',
          border: `3px solid ${isActive ? '#3f51b5' : isCompleted ? 'green' : 'gray'}`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: '10px', // Separación entre el icono y el texto
        }}
      >
        {React.cloneElement(stationIcons[index], {
          sx: { color: isActive ? '#3f51b5' : isCompleted ? 'green' : 'gray' }
        })}
      </Box>
      <Typography variant="body2" color={isActive ? 'primary' : 'textSecondary'}>
        {stationLabels[index]}
      </Typography>
    </Box>
  );
};

export default TimelineStation;
