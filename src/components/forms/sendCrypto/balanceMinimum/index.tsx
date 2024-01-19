'use client';

import { useContext } from 'react';
import { Skeleton } from '@mui/material';

import {
  Context,
  ContextStateType,
} from '@/utils/context/realTimePriceCryptoContext';
import formatPrice from '@/services/formatPrice';

interface Props {
  cryptoSymbol: string;
  balance: number;
  withdrawMinSize: number;
}

export default function BalanceMinimum({
  balance,
  cryptoSymbol,
  withdrawMinSize,
}: Props) {
  const { realTimePriceCrypto } = useContext(Context) as ContextStateType;
  let cryptoPrice = realTimePriceCrypto.current;

  const handleUserCryptoBalance = () => {
    const currentCryptoBalance = balance / cryptoPrice;
    if (cryptoSymbol === 'BTC') return currentCryptoBalance.toFixed(8);
    if (cryptoSymbol === 'USDC' || cryptoSymbol === 'USDT')
      return currentCryptoBalance.toFixed(2);
    return currentCryptoBalance.toFixed(6);
  };

  if (!cryptoPrice)
    return (
      <Skeleton
        variant="rectangular"
        animation="pulse"
        sx={{
          bgcolor: 'grey.900',
          borderRadius: '3px',
        }}
        width="50%"
        height={23}
      />
    );

  return (
    <div className="flex gap-4 justify-between w-1/2">
      <div className="flex gap-1">
        <h3 className="text-primary-2 font-normal text-[15px] whitespace-nowrap">
          Balance available:
        </h3>
        <span className="text-[15px] font-normal text-primary whitespace-nowrap">
          {handleUserCryptoBalance()} {cryptoSymbol} | {formatPrice(balance)}
        </span>
      </div>
      <div className="flex gap-1">
        <h3 className="text-primary-2 font-normal text-[15px] whitespace-nowrap">
          Minimum value:
        </h3>
        <span className="text-[15px] font-normal text-primary whitespace-nowrap">
          {withdrawMinSize >= 1 ? withdrawMinSize.toFixed(2) : withdrawMinSize}{' '}
          {cryptoSymbol}
        </span>
      </div>
    </div>
  );
}
