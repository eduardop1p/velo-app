'use client';
import { IoCopyOutline } from 'react-icons/io5';
import { useState } from 'react';

import AlertMsg, { OpenAlertType } from '@/components/alertMsg';

export default function CopyWalletAddress({
  copyValue,
}: {
  copyValue: string;
}) {
  const [openAlert, setOpenAlert] = useState<OpenAlertType>({
    open: false,
    msg: '',
    severity: 'success',
  });

  const handleCopyValue = async () => {
    try {
      await navigator.clipboard.writeText(copyValue);
      setOpenAlert({
        msg: 'Copied value',
        open: true,
        severity: 'success',
      });
    } catch {
      setOpenAlert({
        msg: 'Error when copying value',
        open: true,
        severity: 'error',
      });
    }
  };

  return (
    <div className="flex-none">
      <AlertMsg openAlert={openAlert} setOpenAlert={setOpenAlert} />

      <button
        type="button"
        className="w-6 h-6 flex items-center justify-center fill-primary stroke-primary cursor-pointer"
        onClick={handleCopyValue}
      >
        <IoCopyOutline />
      </button>
    </div>
  );
}
