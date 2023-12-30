'use client';

// import { useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa6';
import Link from 'next/link';

import PatrimonyGraph from './patrimonyGraph';
import { UserBalanceType } from '@/app/home/page';

export default function UserPatrimony({
  userBalance,
}: {
  userBalance: UserBalanceType;
}) {
  return (
    <section className="bg-secondary w-full p-7 rounded-lg flex justify-between h-[220px]">
      <div className="w-1/2 flex flex-col justify-between">
        <div className="flex w-1/2 items-center justify-between">
          <div className="flex flex-col ">
            <h2 className="text-959ca2ff font-normal text-sm">Patrimony</h2>
            <span className="text-[25px] text-primary font-medium">
              {(+userBalance.patrimony).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </span>
          </div>
          <button className=" h-5 w-5 flex items-center justify-center cursor-pointer fill-primary">
            <FaEyeSlash />
          </button>
        </div>
        <div className="w-full h-[1px] bg-ffffff33"></div>
        <Link
          href="/portfolio"
          className="text-sm text-primary hover:underline font-normal hover:text-blue transition-colors duration-200"
        >{`See full portfolio >`}</Link>
      </div>
      <div className="mx-10 w-[0.8px] h-full bg-ffffff33"></div>
      <div className="w-1/2">
        <PatrimonyGraph userBalance={userBalance} />
      </div>
    </section>
  );
}
