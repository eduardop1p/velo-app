'use client';

import { FaChevronDown, FaChevronRight } from 'react-icons/fa6';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Dispatch, SetStateAction, ReactNode } from 'react';

import { CryptoType } from '../header';

export type ActiveCryptoType =
  | 'currencies'
  | 'smart-contract'
  | 'stablecoin'
  | 'scalling'
  | 'oracle'
  | 'metaverse'
  | 'defi'
  | 'interoperability'
  | 'nft';

export default function Products({
  dataCurrencies,
  dataSmartContract,
  dataStablecoin,
  dataScalling,
  dataOracle,
  dataMetaverse,
  dataDefi,
  dataInteroperability,
  dataNFT,
}: {
  dataCurrencies: CryptoType[];
  dataSmartContract: CryptoType[];
  dataStablecoin: CryptoType[];
  dataScalling: CryptoType[];
  dataOracle: CryptoType[];
  dataMetaverse: CryptoType[];
  dataDefi: CryptoType[];
  dataInteroperability: CryptoType[];
  dataNFT: CryptoType[];
}) {
  const [showProducts, setShowProducts] = useState(false);
  const [showCrypto, setShowCrypto] = useState<ActiveCryptoType>('currencies');

  return (
    <div
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setShowProducts(false);
      }}
      tabIndex={0}
    >
      <div
        className="flex cursor-pointer items-center"
        onClick={() => setShowProducts(!showProducts)}
      >
        <span className="text-sm font-normal text-black">Products</span>
        <button
          type="button"
          // eslint-disable-next-line
          className={`fill-black ml-3 flex h-3 w-3 cursor-pointer items-center justify-center transition-all ${showProducts ? 'rotate-180' : 'rotate-0 '}`}
        >
          <FaChevronDown />
        </button>
      </div>
      {/* eslint-disable-next-line */}
      <div className={`fixed left-0 top-20 h-screen w-screen cursor-default bg-gray-section ${showProducts ? 'block' : 'hidden'}`} onClick={(event) => event.preventDefault()}>
        <div className="h-full flex flex-row justify-center pb-14 pt-8">
          <div className="item h-4/5 flex w-1/5 flex-col items-center border-r-1 border-solid border-r-black">
            <ProductType
              cryptoActive="currencies"
              setShowCrypto={setShowCrypto}
              showCrypto={showCrypto}
            >
              Currencies
            </ProductType>
            <ProductType
              cryptoActive="smart-contract"
              setShowCrypto={setShowCrypto}
              showCrypto={showCrypto}
            >
              Smart contract
            </ProductType>
            <ProductType
              cryptoActive="stablecoin"
              setShowCrypto={setShowCrypto}
              showCrypto={showCrypto}
            >
              Stablecoin
            </ProductType>
            <ProductType
              cryptoActive="scalling"
              setShowCrypto={setShowCrypto}
              showCrypto={showCrypto}
            >
              Scalling
            </ProductType>
            <ProductType
              cryptoActive="oracle"
              setShowCrypto={setShowCrypto}
              showCrypto={showCrypto}
            >
              Oracle
            </ProductType>
            <ProductType
              cryptoActive="metaverse"
              setShowCrypto={setShowCrypto}
              showCrypto={showCrypto}
            >
              Metaverse
            </ProductType>
            <ProductType
              cryptoActive="defi"
              setShowCrypto={setShowCrypto}
              showCrypto={showCrypto}
            >
              DeFi
            </ProductType>
            <ProductType
              cryptoActive="interoperability"
              setShowCrypto={setShowCrypto}
              showCrypto={showCrypto}
            >
              Interoperability
            </ProductType>
            <ProductType
              cryptoActive="nft"
              setShowCrypto={setShowCrypto}
              showCrypto={showCrypto}
            >
              NFT
            </ProductType>
          </div>
          <div className="h-4/5 w-1/3 border-r-1 border-solid border-r-black px-24">
            <ActiveCrypto
              cryptoActive="currencies"
              data={dataCurrencies}
              showCrypto={showCrypto}
              setShowProducts={setShowProducts}
            />
            <ActiveCrypto
              cryptoActive="smart-contract"
              data={dataSmartContract}
              showCrypto={showCrypto}
              setShowProducts={setShowProducts}
            />
            <ActiveCrypto
              cryptoActive="stablecoin"
              data={dataStablecoin}
              showCrypto={showCrypto}
              setShowProducts={setShowProducts}
            />
            <ActiveCrypto
              cryptoActive="scalling"
              data={dataScalling}
              showCrypto={showCrypto}
              setShowProducts={setShowProducts}
            />
            <ActiveCrypto
              cryptoActive="oracle"
              data={dataOracle}
              showCrypto={showCrypto}
              setShowProducts={setShowProducts}
            />
            <ActiveCrypto
              cryptoActive="metaverse"
              data={dataMetaverse}
              showCrypto={showCrypto}
              setShowProducts={setShowProducts}
            />
            <ActiveCrypto
              cryptoActive="defi"
              data={dataDefi}
              showCrypto={showCrypto}
              setShowProducts={setShowProducts}
            />
            <ActiveCrypto
              cryptoActive="interoperability"
              data={dataInteroperability}
              showCrypto={showCrypto}
              setShowProducts={setShowProducts}
            />
            <ActiveCrypto
              cryptoActive="nft"
              data={dataNFT}
              showCrypto={showCrypto}
              setShowProducts={setShowProducts}
            />
          </div>
          <div className="flex w-1/4 justify-center pl-24">
            <div className="h-3/5 relative w-full flex-none">
              <Image
                src="/assets/imgs/velo-img-10.png"
                className="object-cover"
                alt="velo-img-10.png"
                sizes="100%"
                fill
              />
              <div className="absolute bottom-4 left-1/2 w-full -translate-x-1/2 px-8">
                <h2 className="w-full text-center text-2xl font-semibold text-primary">
                  Open your account in a few minutes
                </h2>
                <Link
                  href="/create-account"
                  className="h-10 mx-auto mt-2 flex w-full items-center justify-center rounded-sm bg-blue text-sm font-normal text-black transition-colors duration-200 hover:bg-bluehover hover:text-primary"
                >
                  I want to invest in crypto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductType({
  setShowCrypto,
  showCrypto,
  cryptoActive,
  children,
}: {
  setShowCrypto: Dispatch<SetStateAction<ActiveCryptoType>>;
  showCrypto: ActiveCryptoType;
  cryptoActive: ActiveCryptoType;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className="group mb-8 flex w-3/4 cursor-pointer items-center justify-between border-b-1 border-solid border-black px-2 pb-2"
      onClick={() => setShowCrypto(cryptoActive)}
    >
      <span
        // eslint-disable-next-line
        className={`${showCrypto === cryptoActive ? 'text-blue' : 'text-black'} text-sm font-normal  transition-colors duration-200 group-hover:text-blue`}
      >
        {children}
      </span>
      <div
        // eslint-disable-next-line
        className={`${showCrypto === cryptoActive ? 'fill-blue' : 'fill-black'} ml-3 flex h-3 w-3 flex-none items-center justify-center transition-colors duration-200 group-hover:fill-blue`}
      >
        <FaChevronRight />
      </div>
    </button>
  );
}

function ActiveCrypto({
  data,
  showCrypto,
  cryptoActive,
  setShowProducts,
}: {
  data: CryptoType[];
  showCrypto: ActiveCryptoType;
  cryptoActive: ActiveCryptoType;
  setShowProducts: Dispatch<SetStateAction<boolean>>;
}) {
  const handleFormatNameCrypto = (val: string) =>
    val.toLowerCase().replaceAll(' ', '-');

  return (
    <div
      // eslint-disable-next-line
      className={`${showCrypto === cryptoActive ? 'flex' : 'hidden'} flex-col items-start gap-4`}
    >
      {data.map(val => (
        <Link
          key={handleFormatNameCrypto(val.NAME)}
          href={`/products/${handleFormatNameCrypto(val.NAME)}`}
          className="text-sm font-normal text-black transition-colors duration-200 hover:text-blue"
          onClick={() => setShowProducts(state => !state)}
        >
          {val.NAME} - {val.FROMSYMBOL.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
