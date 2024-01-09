'use client';

// import { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa6';
import Link from 'next/link';
import { useState } from 'react';

import PatrimonyGraph from './patrimonyGraph';
import { UserPatrimonyInvestedType } from '@/app/home/page';

export default function UserPatrimony({
  userPatrimonyInvested,
}: {
  userPatrimonyInvested: UserPatrimonyInvestedType<number>;
}) {
  const hidePatrimonyInvested = {
    hide: true,
    invested: '••••••',
    patrimony: '••••••',
    balance: '••••••',
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

  return (
    <section className="bg-secondary w-full p-7 rounded-lg flex justify-between h-[250px]">
      <div className="w-1/2 flex flex-col justify-between">
        <div className="flex w-1/2 items-center justify-between">
          <div className="flex flex-col ">
            <h2 className="text-959ca2ff font-normal text-sm">Patrimony</h2>
            <span className="text-[25px] text-primary font-medium">
              {stUserPatrimonyInvested.hide
                ? stUserPatrimonyInvested.patrimony
                : handleFormatPrice(+stUserPatrimonyInvested.patrimony)}
            </span>
          </div>
          {!stUserPatrimonyInvested.hide ? (
            <button
              className=" h-5 w-5 flex items-center justify-center cursor-pointer fill-primary "
              onClick={() => handlePatrimonyInvested()}
            >
              <FaEyeSlash />
            </button>
          ) : (
            <button
              className=" h-5 w-5 flex items-center justify-center cursor-pointer fill-primary "
              onClick={() => handleShowPatrimonyInvested()}
            >
              <FaEye />
            </button>
          )}
        </div>
        <div className="w-full h-[1px] bg-ffffff33"></div>
        <Link
          href="/wallet"
          className="text-sm text-primary hover:underline font-normal hover:text-blue transition-colors duration-200 w-fit"
        >{`See full wallet >`}</Link>
      </div>
      <div className="mx-10 w-[0.8px] h-full bg-ffffff33"></div>
      <div className="w-1/2">
        <PatrimonyGraph
          stUserPatrimonyInvested={stUserPatrimonyInvested}
          fontSizeValueInvested="text-lg"
          fontSizeInvested="text-xs"
          innerRadius={77}
          outerRadius={90}
        />
      </div>
    </section>
  );
}
