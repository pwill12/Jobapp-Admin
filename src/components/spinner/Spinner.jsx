import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';

// Inspired by the former Facebook spinners.
function FacebookCircularProgress(props) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="indeterminate"
        sx={{
            color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
            animationDuration: '550ms',
            position: 'relative',
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: 'round',
            },
          }}
        size={20}
        thickness={4}
        {...props}
        value={100}
      />
    </Box>
  );
}

export default function CustomizedProgressBars() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <FacebookCircularProgress />
    </Box>
  );
}
