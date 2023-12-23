'use client';

import { FaChevronDown } from 'react-icons/fa6';
import type { MouseEvent } from 'react';

import { FaqsType } from '..';

export default function Faqs({ title, description, children }: FaqsType) {
  const handleClickDoubts = (event: MouseEvent<HTMLDivElement>) => {
    const description = event.currentTarget.querySelector(
      '#description'
    ) as HTMLElement;
    const button = event.currentTarget.querySelector('button');
    if (!description || !button) return;
    if (window.getComputedStyle(description).display == 'none') {
      description.style.cssText = 'display: block;';
      button.style.rotate = '180deg';
    } else {
      description.style.cssText = 'display: none;';
      button.style.rotate = '0deg';
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      <div
        className="flex flex-col w-full gap-[15px]"
        onClick={handleClickDoubts}
      >
        <div className="w-full flex justify-between items-center cursor-pointer">
          <span className="text-primary text-base font-medium leading-5">
            {title}
          </span>
          <button
            type="button"
            className={`fill-primary flex h-[15px] w-[15px] cursor-pointer items-center justify-center transition-all duration-200`}
          >
            <FaChevronDown />
          </button>
        </div>
        {description ? (
          <p
            id="description"
            className="text-sm font-normal text-primary-2 hidden"
          >
            {description}
          </p>
        ) : (
          <div id="description" className="hidden">
            {children}
          </div>
        )}

        <div className="w-full border-ffffff33 border-solid border-b-[1.5px] flex-none"></div>
      </div>
    </div>
  );
}
