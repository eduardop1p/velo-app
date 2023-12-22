'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import type { Dispatch, SetStateAction } from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

export interface OpenAlertType {
  msg: string;
  open: boolean;
  severity: 'success' | 'error';
}

export default function AlertMsg({
  setOpenAlert,
  openAlert,
}: {
  setOpenAlert: Dispatch<SetStateAction<OpenAlertType>>;
  openAlert: OpenAlertType;
}) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(state => ({ ...state, open: false }));
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={openAlert.open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={openAlert.severity}
          sx={{ width: '100%' }}
        >
          {openAlert.msg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
