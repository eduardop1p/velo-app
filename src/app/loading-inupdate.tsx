'use client';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function Loading() {
  return (
    <>
      <Box
        sx={{ width: '100%', position: 'fixed', top: 0, zIndex: 10, left: 0 }}
      >
        <LinearProgress color="primary" />
      </Box>
    </>
  );
}
