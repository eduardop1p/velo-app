'use client';

import { useContext, useEffect, useRef } from 'react';
import { Skeleton } from '@mui/material';

import useWebSocketCryptoPrice from '@/utils/useWebSocketCryptoPrice';
import {
  Context,
  ContextStateType,
} from '@/utils/context/realTimePriceCryptoContext';
import formatPrice from '@/services/formatPrice';

export default function CryptoCurrentPrice({
  cryptoSymbol,
  cryptoName, // eslint-disable-line
}: {
  cryptoSymbol: string;
  cryptoName: string;
}) {
  const { setRealTimePriceCrypto } = useContext(Context) as ContextStateType;

  const cryptoPrice = useWebSocketCryptoPrice({ symbol: cryptoSymbol });

  let refCryptoPrice = useRef(cryptoPrice);

  useEffect(() => {
    if (cryptoPrice.current !== refCryptoPrice.current.current) {
      setRealTimePriceCrypto(cryptoPrice);
    }
    refCryptoPrice.current = cryptoPrice;
  }, [setRealTimePriceCrypto, cryptoPrice]);

  const handleColorPrice = () => {
    if (cryptoPrice.current === cryptoPrice.prev) return 'text-primary-2';
    return cryptoPrice.current > cryptoPrice.prev
      ? 'text-blue'
      : 'text-red-600';
  };

  if (!cryptoPrice.current)
    return (
      <Skeleton
        variant="rectangular"
        animation="pulse"
        sx={{
          bgcolor: 'grey.900',
          borderRadius: '3px',
        }}
        width="20%"
        height={22}
      />
    );

  return (
    // eslint-disable-next-line
    <div className={`flex gap-1 items-center`}>
      <h3 className="text-primary font-normal text-base">Real time price:</h3>
      {/* eslint-disable-next-line */}
      <span className={`text-[15px] font-normal ${handleColorPrice()}`}>
        {formatPrice(cryptoPrice.current)}
      </span>
    </div>
  );
}
