'use client';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <div className="bg-0006 w-full z-20 fixed h-screen flex justify-center items-center inset-0">
      <Box sx={{ display: 'flex' }}>
        <CircularProgress
          style={{
            width: '50px',
            height: '50px',
            color: '#fff',
          }}
        />
      </Box>
    </div>
  );
}
