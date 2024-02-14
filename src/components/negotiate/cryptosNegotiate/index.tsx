'use client';

import { CryptoType } from '@/components/header';
import formatPrice from '@/services/formatPrice';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { IoIosClose } from 'react-icons/io';

export default function CryptoNegotiate({
  dataCryptos,
}: {
  dataCryptos: CryptoType[];
}) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchCrypto = (name: string, symbol: string) => {
    if (!searchValue.trim()) return 'flex';
    return name.indexOf(searchValue.toLowerCase()) !== -1 ||
      symbol.indexOf(searchValue.toLowerCase()) !== -1
      ? 'flex'
      : 'hidden';
  };

  return (
    <div className="mt-5">
      <div className="relative w-full flex items-center gap-4 px-2 border-b-1 border-solid border-ffffff33 h-[40px]">
        <div className="flex justify-center items-center w-4 h-4 fill-primary">
          <FaSearch />
        </div>
        <input
          value={searchValue}
          placeholder="Search"
          id="search"
          name="search"
          type="text"
          className="w-full bg-transparent text-primary text-[15px] font-normal"
          onChange={event => setSearchValue(event.target.value)}
        />
        {searchValue && (
          <div
            className="flex justify-center items-center w-8 h-8 fill-primary cursor-pointer"
            onClick={() => setSearchValue('')}
          >
            <IoIosClose />
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-5 mt-4">
        {dataCryptos.map((val, index) => (
          <Link
            // eslint-disable-next-line
            href={`/negotiate/crypto/${val.FROMSYMBOL.toLowerCase()}`}
            key={index.toString()}
            className={`p-6 bg-1b1e20ff ${handleSearchCrypto(
              val.NAME.toLowerCase(),
              val.FROMSYMBOL.toLowerCase()
            )} rounded flex-col group hover:bg-383b3eff transition-colors duration-200 cursor-pointer`}
          >
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${val.IMAGEURL}`}
                      alt={val.NAME}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <h4 className="text-primary font-normal text-sm">
                      {val.NAME}
                    </h4>
                  </div>
                  <h3 className="text-sm font-normal text-gray-b8bec4ff ml-10">
                    {val.FROMSYMBOL}
                  </h3>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-gray-b8bec4ff font-normal text-xs">
                    Last quote
                  </span>
                  <span className="text-primary font-medium text-sm">
                    {formatPrice(val.PRICE)}
                  </span>
                  {val.CHANGEPCTDAY < 0 && (
                    <div className="flex gap-[5px] items-center">
                      <div className="w-3 h-3 flex items-center justify-center fill-red-600">
                        <FaArrowDown />
                      </div>
                      <span className={`font-normal text-sm text-red-600`}>
                        {val.CHANGEPCTDAY.toFixed(2).replace('-', '')}%
                      </span>
                    </div>
                  )}
                  {val.CHANGEPCTDAY > 0 && (
                    <div className="flex gap-[5px] items-center">
                      <div className="w-3 h-3 flex items-center justify-center fill-blue">
                        <FaArrowUp />
                      </div>
                      <span className={`font-normal text-sm text-blue`}>
                        {val.CHANGEPCTDAY.toFixed(2)}%
                      </span>
                    </div>
                  )}
                  {val.CHANGEPCTDAY === 0 && (
                    <span className={`font-normal text-sm text-999`}>
                      {val.CHANGEPCTDAY.toFixed(2)}%
                    </span>
                  )}
                </div>
              </div>
              <span className="text-primary font-normal text-[13px] group-hover:text-blue transition-colors duration-200">
                {`See details >`}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
