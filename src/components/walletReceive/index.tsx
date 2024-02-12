/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { FaSearch } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { CryptoType } from '../header';

interface Props {
  dataCryptos: CryptoType[];
  balance: number;
}

export default function WalletReceive({ dataCryptos, balance }: Props) {
  const [searchValue, setSearchValue] = useState('');
  const [showSendDollar, setShowSendDollar] = useState(false);

  const handleSearchCrypto = (name: string, symbol: string) => {
    if (!searchValue.trim()) return 'flex';
    return name.indexOf(searchValue.toLowerCase()) !== -1 ||
      symbol.indexOf(searchValue.toLowerCase()) !== -1
      ? 'flex'
      : 'hidden';
  };

  return (
    <>
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
        <Link
          href="/wallet/deposit"
          className={`p-6 bg-1b1e20ff ${handleSearchCrypto(
            'dollar',
            'usd'
          )} rounded flex-col hover:bg-383b3eff transition-colors duration-200 cursor-pointer`}
        >
          <div className="flex items-center gap-2">
            <Image
              src="/assets/imgs/velo-img-20.webp"
              alt="dollar"
              width={25}
              height={25}
              className="rounded-full"
            />
            <h4 className="text-primary font-normal text-sm">Dollar</h4>
          </div>
          <h3 className="text-sm font-normal text-primary ml-[33px]">USD</h3>
        </Link>
        {dataCryptos.map((val, index) => (
          <Link
            // eslint-disable-next-line
            href={`/wallet/receive/${val.FROMSYMBOL.toLowerCase()}`}
            key={index.toString()}
            className={`p-6 bg-1b1e20ff ${handleSearchCrypto(
              val.NAME.toLowerCase(),
              val.FROMSYMBOL.toLowerCase()
            )} rounded flex-col hover:bg-383b3eff transition-colors duration-200 cursor-pointer`}
          >
            <div className="flex items-center gap-2">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${val.IMAGEURL}`}
                alt={val.NAME}
                width={32}
                height={32}
                className="rounded-full"
              />
              <h4 className="text-primary font-normal text-sm">{val.NAME}</h4>
            </div>
            <h3 className="text-sm font-normal text-primary ml-10">
              {val.FROMSYMBOL}
            </h3>
          </Link>
        ))}
      </div>
    </>
  );
}
