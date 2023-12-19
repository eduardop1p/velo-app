'use client';

import { FaChevronDown } from 'react-icons/fa6';
import type { MouseEvent } from 'react';

export default function Doubts() {
  const handleClickDoubts = (event: MouseEvent<HTMLDivElement>) => {
    const p = event.currentTarget.querySelector('p');
    const button = event.currentTarget.querySelector('button');
    if (!p || !button) return;
    if (window.getComputedStyle(p).display == 'none') {
      p.style.cssText = 'display: block;';
      button.style.rotate = '180deg';
    } else {
      p.style.cssText = 'display: none;';
      button.style.rotate = '0deg';
    }
  };

  return (
    <div className="mt-12 flex flex-col gap-10">
      <div
        className="flex flex-col w-full gap-[15px]"
        onClick={handleClickDoubts}
      >
        <div className="w-full flex justify-between items-center cursor-pointer">
          <span className="text-black text-[15px] font-normal leading-none">
            What is Bitcoin?
          </span>
          <button
            type="button"
            className={`fill-black flex h-[15px] w-[15px] cursor-pointer items-center justify-center transition-all duration-200`}
          >
            <FaChevronDown />
          </button>
        </div>
        <p className="text-sm font-normal text-black hidden">
          Bitcoin is a decentralized digital currency, allowing direct
          transactions between users without intermediaries. It works with
          blockchain technology, ensuring security and privacy.
        </p>
        <div className="w-full border-gray-00000033 border-solid border-b-[1.5px] flex-none"></div>
      </div>
      <div
        className="flex flex-col w-full gap-[15px]"
        onClick={handleClickDoubts}
      >
        <div className="w-full flex justify-between items-center cursor-pointer">
          <span className="text-black text-[15px] font-normal leading-none">
            How to buy Bitcoin?
          </span>
          <button
            type="button"
            className={`fill-black flex h-[15px] w-[15px] cursor-pointer items-center justify-center transition-all duration-200`}
          >
            <FaChevronDown />
          </button>
        </div>
        <p className="text-sm font-normal text-black hidden">
          To acquire Bitcoin, you need a digital wallet and you can buy it from
          specialized brokers. Sign up, deposit money, choose the desired amount
          and {`that's`} it!
        </p>
        <div className="w-full border-gray-00000033 border-solid border-b-[1.5px] flex-none"></div>
      </div>
      <div
        className="flex flex-col w-full gap-[15px]"
        onClick={handleClickDoubts}
      >
        <div className="w-full flex justify-between items-center cursor-pointer">
          <span className="text-black text-[15px] font-normal leading-none">
            How does Bitcoin security work?
          </span>
          <button
            type="button"
            className={`fill-black flex h-[15px] w-[15px] cursor-pointer items-center justify-center transition-all duration-200`}
          >
            <FaChevronDown />
          </button>
        </div>
        <p className="text-sm font-normal text-black hidden">
          {`Bitcoin's`} security comes from the blockchain, a public, immutable
          record of transactions. Advanced encryption protects transactions and
          decentralization prevents fraud.
        </p>
        <div className="w-full border-gray-00000033 border-solid border-b-[1.5px] flex-none"></div>
      </div>
      <div
        className="flex flex-col w-full gap-[15px]"
        onClick={handleClickDoubts}
      >
        <div className="w-full flex justify-between items-center cursor-pointer">
          <span className="text-black text-[15px] font-normal leading-none">
            What is the appreciation potential of Bitcoin?
          </span>
          <button
            type="button"
            className={`fill-black flex h-[15px] w-[15px] cursor-pointer items-center justify-center transition-all duration-200`}
          >
            <FaChevronDown />
          </button>
        </div>
        <p className="text-sm font-normal text-black hidden">
          The value of Bitcoin is volatile and can vary greatly. Their limited
          supply and growing interest can lead to significant appreciation, but
          remember that investments have risks.
        </p>
        <div className="w-full border-gray-00000033 border-solid border-b-[1.5px] flex-none"></div>
      </div>
      <div
        className="flex flex-col w-full gap-[15px]"
        onClick={handleClickDoubts}
      >
        <div className="w-full flex justify-between items-center cursor-pointer">
          <span className="text-black text-[15px] font-normal leading-none">
            Is it possible to use Bitcoin in everyday life?
          </span>
          <button
            type="button"
            className={`fill-black flex h-[15px] w-[15px] cursor-pointer items-center justify-center transition-all duration-200`}
          >
            <FaChevronDown />
          </button>
        </div>
        <p className="text-sm font-normal text-black hidden">
          Yes, more and more businesses are accepting Bitcoin as payment.
          However, its adoption is still limited compared to traditional
          currencies.
        </p>
        <div className="w-full border-gray-00000033 border-solid border-b-[1.5px] flex-none"></div>
      </div>
    </div>
  );
}
