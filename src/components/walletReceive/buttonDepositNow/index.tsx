'use client';

import { useState } from 'react';
import { ReceiveInDollar } from '..';

export default function ButtonDepositNow({
  balance,
  token,
}: {
  balance: number;
  token: string;
}) {
  const [showReceiveDollar, setShowReceiveDollar] = useState(false);
  return (
    <>
      <button
        type="button"
        className="text-primary w-fit bg-195ab4ff hover:bg-blue transition-colors duration-200 text-sm font-medium h-9 px-4 py-2 rounded flex items-center justify-center"
        onClick={() => setShowReceiveDollar(true)}
      >
        Deposit now
      </button>
      <ReceiveInDollar
        setShowReceiveDollar={setShowReceiveDollar}
        showReceiveDollar={showReceiveDollar}
        balance={balance}
        token={token}
      />
    </>
  );
}
