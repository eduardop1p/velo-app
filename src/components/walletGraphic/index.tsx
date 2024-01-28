'use client';

import { useEffect, useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa6';

import type { UserPatrimonyInvestedType } from '@/app/home/page';
import PatrimonyGraph from '../userPatrimony/patrimonyGraph';
import getInvestedProfit from '@/services/getInvestedProfit';
import formatPrice from '@/services/formatPrice';

export default function WalletGraphic({
  userPatrimonyInvested,
}: {
  userPatrimonyInvested: UserPatrimonyInvestedType<number>;
}) {
  const hidePatrimonyInvested: UserPatrimonyInvestedType<string> & {
    hide: boolean;
  } = {
    hide: true,
    invested: {
      value: '••••••',
      active: [],
    },
    patrimony: '••••••',
    balance: '••••••',
    transit: '••••••',
  };
  const showPatrimonyInvested = { hide: false, ...userPatrimonyInvested };

  // eslint-disable-next-line
  const [stUserPatrimonyInvested, setStUserPatrimonyInvested] = useState(localStorage.getItem('hide-patrimony-invested') == 'true' ? hidePatrimonyInvested : showPatrimonyInvested);
  const [investedProfit, setInvestedProfit] = useState<{
    value: string;
    color: string;
  } | null>(null);

  useEffect(() => {
    if (userPatrimonyInvested.invested.active.length) {
      const { value, color } = getInvestedProfit(
        userPatrimonyInvested.invested.active
      );
      setInvestedProfit({ value, color });
    }
  }, [userPatrimonyInvested]);

  const handlePatrimonyInvested = () => {
    setStUserPatrimonyInvested(hidePatrimonyInvested);
    localStorage.setItem('hide-patrimony-invested', 'true');
  };

  const handleShowPatrimonyInvested = () => {
    setStUserPatrimonyInvested(showPatrimonyInvested);
    localStorage.removeItem('hide-patrimony-invested');
  };

  const handleAccountBalance = () => {
    return stUserPatrimonyInvested.hide
      ? stUserPatrimonyInvested.balance
      : formatPrice(+stUserPatrimonyInvested.balance);
  };

  const handleAccountTransit = () => {
    if (typeof stUserPatrimonyInvested.transit === 'undefined') return;

    return stUserPatrimonyInvested.hide
      ? stUserPatrimonyInvested.transit
      : formatPrice(+stUserPatrimonyInvested.transit);
  };

  return (
    <section className="w-full flex gap-10 items-center">
      <div className="w-[250px] h-[250px]">
        <PatrimonyGraph
          stUserPatrimonyInvested={stUserPatrimonyInvested}
          fontSizeValueInvested="text-[22px]"
          fontSizeInvested="text-sm"
          innerRadius={103}
          outerRadius={120}
        />
      </div>
      <div className="flex flex-col gap-6 w-[300px]">
        <div className="flex justify-between gap-4 items-center">
          <div className="flex flex-col gap-[2px]">
            <h4 className="text-959ca2ff text-[13px] font-normal">Patrimony</h4>
            <h2 className="text-[28px] text-primary font-medium">
              {stUserPatrimonyInvested.hide
                ? stUserPatrimonyInvested.patrimony
                : formatPrice(+stUserPatrimonyInvested.patrimony)}
            </h2>
            {investedProfit && (
              <span
                className={`${investedProfit.color} font-normal text-sm mt-[2px] ml-[2px]`}
              >
                {investedProfit.value}
              </span>
            )}
          </div>
          {!stUserPatrimonyInvested.hide ? (
            <button
              className="h-6 w-6 flex items-center justify-center cursor-pointer fill-primary "
              onClick={() => handlePatrimonyInvested()}
            >
              <FaEyeSlash />
            </button>
          ) : (
            <button
              className="h-6 w-6 flex items-center justify-center cursor-pointer fill-primary "
              onClick={() => handleShowPatrimonyInvested()}
            >
              <FaEye />
            </button>
          )}
        </div>
        <div className="w-full h-[1px] bg-ffffff33"></div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <h4 className="text-c1c5d0 text-[13px] font-normal">
              Account balance:
            </h4>
            <h4 className="text-c1c5d0 text-[13px] font-normal">
              {handleAccountBalance()}
            </h4>
          </div>
          <div className="flex gap-2">
            <h4 className="text-c1c5d0 text-[13px] font-normal">
              Balance in transit:
            </h4>
            <h4 className="text-c1c5d0 text-[13px] font-normal">
              {handleAccountTransit()}
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
}
