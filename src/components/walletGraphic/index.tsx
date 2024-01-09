'use client';

import { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa6';

import type { UserPatrimonyInvestedType } from '@/app/home/page';
import PatrimonyGraph from '../userPatrimony/patrimonyGraph';

export default function WalletGraphic({
  userPatrimonyInvested,
}: {
  userPatrimonyInvested: UserPatrimonyInvestedType<number>;
}) {
  const hidePatrimonyInvested = {
    hide: true,
    invested: '••••••',
    patrimony: '••••••',
    balance: '••••••',
    transit: '••••••',
  };
  const showPatrimonyInvested = { hide: false, ...userPatrimonyInvested };

  // eslint-disable-next-line
  const [stUserPatrimonyInvested, setStUserPatrimonyInvested] = useState(localStorage.getItem('hide-patrimony-invested') == 'true' ? hidePatrimonyInvested : showPatrimonyInvested);

  const handleFormatPrice = (value: number) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const handlePatrimonyInvested = () => {
    setStUserPatrimonyInvested(hidePatrimonyInvested);
    localStorage.setItem('hide-patrimony-invested', 'true');
  };

  const handleShowPatrimonyInvested = () => {
    setStUserPatrimonyInvested(showPatrimonyInvested);
    localStorage.removeItem('hide-patrimony-invested');
  };

  const handleAccountBalance = () => {
    if (typeof stUserPatrimonyInvested.balance === 'undefined') return;

    return stUserPatrimonyInvested.hide
      ? stUserPatrimonyInvested.balance
      : handleFormatPrice(+stUserPatrimonyInvested.balance);
  };

  const handleAccountTransit = () => {
    if (typeof stUserPatrimonyInvested.transit === 'undefined') return;

    return stUserPatrimonyInvested.hide
      ? stUserPatrimonyInvested.transit
      : handleFormatPrice(+stUserPatrimonyInvested.transit);
  };

  return (
    <section className="w-full flex gap-10 items-center">
      <div className="w-[250px] h-[250px]">
        <PatrimonyGraph
          stUserPatrimonyInvested={stUserPatrimonyInvested}
          fontSizeValueInvested="text-2xl"
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
                : handleFormatPrice(+stUserPatrimonyInvested.patrimony)}
            </h2>
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
