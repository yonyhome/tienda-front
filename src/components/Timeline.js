// Timeline.js
import React from 'react';
import TimelineStation from './TimelineStation';
import { Box } from '@mui/material';

const Timeline = ({ currentStatus }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      {[0, 1, 2, 3, 4].map((index) => (
        <TimelineStation key={index} index={index} currentStatus={currentStatus} />
      ))}
    </Box>
  );
};

export default Timeline;
