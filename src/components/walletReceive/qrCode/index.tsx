'use client';

import QRcode from 'react-qr-code';

export default function QRcodeReceive({ qrvalue }: { qrvalue: string }) {
  return (
    <div className="flex flex-col gap-2 items-start flex-none">
      <h2 className="text-primary font-normal text-[15px] opacity-70">
        QRCode
      </h2>
      <div className="p-4 rounded-lg bg-primary">
        <QRcode value={qrvalue} size={170} level="M" />
      </div>
    </div>
  );
}
