'use client';

import { FaChevronDown } from 'react-icons/fa6';
import type { MouseEvent } from 'react';

export default function Doubts({
  doubts,
}: {
  doubts: {
    doubts1: {
      title: string;
      description: string;
    };
    doubts2?: {
      title: string;
      description: string;
    };
    doubts3?: {
      title: string;
      description: string;
    };
    doubts4?: {
      title: string;
      description: string;
    };
    doubts5?: {
      title: string;
      description: string;
    };
  };
}) {
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
            {doubts.doubts1?.title}
          </span>
          <button
            type="button"
            className={`fill-black flex h-[15px] w-[15px] cursor-pointer items-center justify-center transition-all duration-200`}
          >
            <FaChevronDown />
          </button>
        </div>
        <p className="text-sm font-normal text-black hidden">
          {doubts.doubts1?.description}
        </p>
        <div className="w-full border-gray-00000033 border-solid border-b-[1.5px] flex-none"></div>
      </div>
      <div
        className="flex flex-col w-full gap-[15px]"
        onClick={handleClickDoubts}
      >
        <div className="w-full flex justify-between items-center cursor-pointer">
          <span className="text-black text-[15px] font-normal leading-none">
            {doubts.doubts2?.title}
          </span>
          <button
            type="button"
            className={`fill-black flex h-[15px] w-[15px] cursor-pointer items-center justify-center transition-all duration-200`}
          >
            <FaChevronDown />
          </button>
        </div>
        <p className="text-sm font-normal text-black hidden">
          {doubts.doubts2?.description}
        </p>
        <div className="w-full border-gray-00000033 border-solid border-b-[1.5px] flex-none"></div>
      </div>
      <div
        className="flex flex-col w-full gap-[15px]"
        onClick={handleClickDoubts}
      >
        <div className="w-full flex justify-between items-center cursor-pointer">
          <span className="text-black text-[15px] font-normal leading-none">
            {doubts.doubts3?.title}
          </span>
          <button
            type="button"
            className={`fill-black flex h-[15px] w-[15px] cursor-pointer items-center justify-center transition-all duration-200`}
          >
            <FaChevronDown />
          </button>
        </div>
        <p className="text-sm font-normal text-black hidden">
          {doubts.doubts3?.description}
        </p>
        <div className="w-full border-gray-00000033 border-solid border-b-[1.5px] flex-none"></div>
      </div>
      <div
        className="flex flex-col w-full gap-[15px]"
        onClick={handleClickDoubts}
      >
        <div className="w-full flex justify-between items-center cursor-pointer">
          <span className="text-black text-[15px] font-normal leading-none">
            {doubts.doubts4?.title}
          </span>
          <button
            type="button"
            className={`fill-black flex h-[15px] w-[15px] cursor-pointer items-center justify-center transition-all duration-200`}
          >
            <FaChevronDown />
          </button>
        </div>
        <p className="text-sm font-normal text-black hidden">
          {doubts.doubts4?.description}
        </p>
        <div className="w-full border-gray-00000033 border-solid border-b-[1.5px] flex-none"></div>
      </div>
      <div
        className="flex flex-col w-full gap-[15px]"
        onClick={handleClickDoubts}
      >
        <div className="w-full flex justify-between items-center cursor-pointer">
          <span className="text-black text-[15px] font-normal leading-none">
            {doubts.doubts5?.title}
          </span>
          <button
            type="button"
            className={`fill-black flex h-[15px] w-[15px] cursor-pointer items-center justify-center transition-all duration-200`}
          >
            <FaChevronDown />
          </button>
        </div>
        <p className="text-sm font-normal text-black hidden">
          {doubts.doubts5?.description}
        </p>
        <div className="w-full border-gray-00000033 border-solid border-b-[1.5px] flex-none"></div>
      </div>
    </div>
  );
}
