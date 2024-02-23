'use client';

import { FaSearch } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { CryptoType } from '../header';

import { CountriesType } from '@/app/create-account/page';

interface Props {
  dataCryptos: CryptoType[];
  balance: number;
  dataCountries: CountriesType[];
}

export default function WalletSend({ dataCryptos }: Props) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchCrypto = (name: string, symbol?: string) => {
    if (!searchValue.trim()) return 'flex';
    return name.indexOf(searchValue.toLowerCase()) !== -1 ||
      symbol?.indexOf(searchValue.toLowerCase()) !== -1
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
          href="/wallet/send/paypal"
          className={`${handleSearchCrypto(
            'paypal',
            'paypal'
          )} p-6 bg-1b1e20ff rounded flex-col hover:bg-383b3eff transition-colors duration-200 cursor-pointer`}
        >
          <div className="flex items-center gap-2">
            <Image
              src="/assets/imgs/paypal.png"
              alt="paypal"
              width={25}
              height={25}
              className="rounded-full"
            />
            <h4 className="text-primary font-normal text-sm">PayPal</h4>
          </div>
          {/* <h3 className="text-sm font-normal text-primary ml-[33px]">USD</h3> */}
        </Link>
        <Link
          href="/wallet/send/payoneer"
          className={`${handleSearchCrypto(
            'payoneer',
            'payoneer'
          )} p-6 bg-1b1e20ff rounded flex-col hover:bg-383b3eff transition-colors duration-200 cursor-pointer`}
        >
          <div className="flex gap-2 items-center">
            <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center">
              <Image
                src="/assets/imgs/payoneer.png"
                alt="payoneer"
                width={50}
                height={50}
              />
            </div>
            <h4 className="text-primary font-normal text-sm">Payoneer</h4>
          </div>
          {/* <h3 className="text-sm font-normal text-primary ml-[33px]">USD</h3> */}
        </Link>
        <Link
          href="/wallet/send/wise"
          className={`${handleSearchCrypto(
            'wise',
            'wise'
          )} p-6 bg-1b1e20ff rounded flex-col hover:bg-383b3eff transition-colors duration-200 cursor-pointer`}
        >
          <div className="flex gap-2">
            <Image
              src="/assets/imgs/wise.png"
              alt="wise"
              width={50}
              height={50}
              className="rounded-full -mt-[15px]"
            />
            <h4 className="text-primary font-normal text-sm">Wise</h4>
          </div>
          {/* <h3 className="text-sm font-normal text-primary ml-[33px]">USD</h3> */}
        </Link>
        <Link
          href="/wallet/send/skrill"
          className={`${handleSearchCrypto(
            'skrill',
            'skrill'
          )} p-6 bg-1b1e20ff rounded flex-col hover:bg-383b3eff transition-colors duration-200 cursor-pointer`}
        >
          <div className="flex gap-2 items-center">
            <Image
              src="/assets/svg/skrill.svg"
              alt="skrill"
              width={45}
              height={45}
            />
            <h4 className="text-primary font-normal text-sm">Skrill</h4>
          </div>
          {/* <h3 className="text-sm font-normal text-primary ml-[33px]">USD</h3> */}
        </Link>
        <Link
          href="/wallet/send/neteller"
          className={`${handleSearchCrypto(
            'neteller',
            'neteller'
          )} p-6 bg-1b1e20ff rounded flex-col hover:bg-383b3eff transition-colors duration-200 cursor-pointer`}
        >
          <div className="flex gap-2 items-start">
            <Image
              src="/assets/imgs/neteller.png"
              alt="neteller"
              width={70}
              height={70}
              className="-mt-[10px]"
            />
            <h4 className="text-primary font-normal text-sm -mt-[3px]">
              Neteller
            </h4>
          </div>
          {/* <h3 className="text-sm font-normal text-primary ml-[33px]">USD</h3> */}
        </Link>
        {dataCryptos.map((val, index) => (
          <Link
            // eslint-disable-next-line
            href={`/wallet/send/${val.FROMSYMBOL.toLowerCase()}`}
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
