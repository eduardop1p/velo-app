/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useContext } from 'react';
import SkeletonUi from '@/components/skeletonUI';

import {
  Context,
  ContextStateType,
} from '@/utils/context/realTimePriceCryptoContext';
import formatPrice from '@/services/formatPrice';

interface Props {
  cryptoSymbol: string;
  userCryptoBalance: number;
  withdrawMinSize: number;
}

export default function BalanceMinimum({
  userCryptoBalance,
  cryptoSymbol,
  withdrawMinSize,
}: Props) {
  const { realTimePriceCrypto } = useContext(Context) as ContextStateType;
  const cryptoPrice = realTimePriceCrypto.current;

  const handleUserCryptoBalance = () => {
    if (cryptoSymbol === 'BTC') return userCryptoBalance.toFixed(8);
    if (cryptoSymbol === 'USDC' || cryptoSymbol === 'USDT')
      return userCryptoBalance.toFixed(2);
    return userCryptoBalance.toFixed(6);
  };

  const handleWithdrawMinSize = () => {
    if (cryptoSymbol === 'BTC') return withdrawMinSize.toFixed(8);
    if (cryptoSymbol === 'USDT' || cryptoSymbol === 'USDC')
      return withdrawMinSize.toFixed(2);
    return withdrawMinSize.toFixed(6);
  };

  if (!cryptoPrice)
    return (
      <div className="flex gap-4 justify-between w-1/2">
        <SkeletonUi width="50%" height={23} />
        <SkeletonUi width="40%" height={23} />
      </div>
    );

  return (
    <div className="flex gap-4 justify-between w-1/2">
      <div className="flex gap-1">
        <h3 className="text-primary-2 font-normal text-[15px] whitespace-nowrap">
          Balance available:
        </h3>
        <span className="text-[15px] font-normal text-primary whitespace-nowrap">
          {handleUserCryptoBalance()} {cryptoSymbol} |{' '}
          {formatPrice(userCryptoBalance * realTimePriceCrypto.current)}
        </span>
      </div>
      <div className="flex gap-1">
        <h3 className="text-primary-2 font-normal text-[15px] whitespace-nowrap">
          Minimum value:
        </h3>
        <span className="text-[15px] font-normal text-primary whitespace-nowrap">
          {handleWithdrawMinSize()} {cryptoSymbol}
        </span>
      </div>
    </div>
  );
}
