import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function Animations() {
  return (
    <Box sx={{ width: 1000,marginBottom: '10px' }}>
      <Skeleton sx={{ height: 100,marginBottom: '10px' }}/>
      <Skeleton animation="wave"  sx={{ height: 100,marginBottom: '10px' }}/>
      <Skeleton animation={false}  sx={{ height: 100,marginBottom: '10px' }}/>
    </Box>
  );
}
