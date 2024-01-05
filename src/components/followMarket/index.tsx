'use client';

import { FaArrowDownShortWide, FaArrowDownWideShort } from 'react-icons/fa6';
import { TbArrowsUpDown } from 'react-icons/tb';
import Image from 'next/image';
import {
  useEffect,
  useState,
  type ReactNode,
  type MouseEventHandler,
} from 'react';
import Link from 'next/link';

import { CryptoType } from '../header';
import { GraphicLine } from '../sliderCryptoassets';

export default function FollowMarket({
  dataCryptos,
}: {
  dataCryptos: CryptoType[];
}) {
  const [stDataCryptos, setStDataCryptos] = useState(dataCryptos.slice(0, 5));
  const [orderPrices, setOrderPrices] = useState<'desc' | 'asc' | 'default'>(
    'default'
  );
  const [orderPercent, setOrderPercent] = useState<'desc' | 'asc' | 'default'>(
    'default'
  );

  useEffect(() => {
    if (orderPrices === 'desc') {
      const newArrDataCryptos = [...dataCryptos];
      setStDataCryptos(
        newArrDataCryptos.sort((a, b) => a.PRICE - b.PRICE).slice(0, 5)
      );
      return;
    }
    if (orderPrices === 'asc') {
      const newArrDataCryptos = [...dataCryptos];
      setStDataCryptos(
        newArrDataCryptos.sort((a, b) => b.PRICE - a.PRICE).slice(0, 5)
      );
      return;
    }
    if (orderPercent === 'desc') {
      const newArrDataCryptos = [...dataCryptos];
      setStDataCryptos(
        newArrDataCryptos
          .sort((a, b) => a.CHANGEPCTDAY - b.CHANGEPCTDAY)
          .slice(0, 5)
      );
      return;
    }
    if (orderPercent === 'asc') {
      const newArrDataCryptos = [...dataCryptos];
      setStDataCryptos(
        newArrDataCryptos
          .sort((a, b) => b.CHANGEPCTDAY - a.CHANGEPCTDAY)
          .slice(0, 5)
      );
      return;
    }

    setStDataCryptos(dataCryptos.slice(0, 5));
  }, [orderPrices, orderPercent, dataCryptos]);

  const handleFormatPrice = (value: number) => {
    const minimumFractionDigits = handleFormatPriceAndPercent(value.toString());

    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits,
    });
  };

  const handleFormatPriceAndPercent = (value: string) => {
    const indexFloatPoint = value.indexOf('.') + 1;
    const CHANGEDAYNextFloatPoint = value.slice(indexFloatPoint);
    const minimumFractionDigits =
      CHANGEDAYNextFloatPoint.slice(0, 2) === '00'
        ? CHANGEDAYNextFloatPoint.slice(0, 3) === '000'
          ? CHANGEDAYNextFloatPoint.slice(0, 4) === '0000'
            ? CHANGEDAYNextFloatPoint.slice(0, 5) === '00000'
              ? CHANGEDAYNextFloatPoint.slice(0, 6) === '000000'
                ? 7
                : 6
              : 5
            : 4
          : 3
        : 2;
    return minimumFractionDigits;
  };

  const handleCalcVwap24HrAndPercent = (value: number) => {
    const minimumFractionDigits = handleFormatPriceAndPercent(value.toString());
    return `${value.toFixed(minimumFractionDigits)}%`;
  };

  const hanldeAddpercentColor = (val: number) => {
    // eslint-disable-next-line
    return `${!handleCalcVwap24HrAndPercent(val).includes('-') ? 'text-blue' : 'text-red-graphic'}`;
  };

  return (
    <section className="w-full flex flex-col gap-4 mt-6">
      <h2 className="text-2xl text-primary font-normal">Follow the Market</h2>
      <div className="flex rounded-md overflow-hidden w-full justify-between">
        <div className="flex flex-col w-full">
          <div className="flex gap-2 px-4 py-6 bg-272a2eff items-center cursor-default ">
            <h4 className="text-primary-2 font-normal text-[15px]">Cryptos</h4>
          </div>
          {stDataCryptos.map(val => (
            <div
              key={val.NAME}
              className="flex items-center gap-[5px] border-t-1 border-solid border-34383cff px-4 py-6 bg-black-section-2 h-[79px]"
            >
              <Image
                width={30}
                height={30}
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}${val.IMAGEURL}`}
                alt={val.NAME}
              />
              <span className="text-primary text-[15px] font-medium">
                {val.FROMSYMBOL}
              </span>
              <span className="text-primary text-sm font-normal opacity-70">
                {val.NAME}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-full">
          <div className="flex gap-2 px-4 py-6 bg-272a2eff items-center cursor-pointer relative">
            <h4 className="text-primary-2 font-normal text-[15px]">Price</h4>
            {orderPrices === 'desc' && (
              <OrderClick
                price
                onClick={() => {
                  setOrderPercent('default');
                  setOrderPrices('asc');
                }}
              >
                <FaArrowDownShortWide />
              </OrderClick>
            )}
            {orderPrices === 'asc' && (
              <OrderClick
                price
                onClick={() => {
                  setOrderPercent('default');
                  setOrderPrices('default');
                }}
              >
                <FaArrowDownWideShort />
              </OrderClick>
            )}
            {orderPrices === 'default' && (
              <OrderClick
                price
                onClick={() => {
                  setOrderPercent('default');
                  setOrderPrices('desc');
                }}
              >
                <TbArrowsUpDown />
              </OrderClick>
            )}
          </div>
          {stDataCryptos.map(val => (
            <div
              className="flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-black-section-2 text-primary font-normal text-sm h-[79px]"
              key={val.NAME}
            >
              {handleFormatPrice(val.PRICE)}
            </div>
          ))}
        </div>
        <div className="flex flex-col w-full">
          <div className="flex gap-2 px-4 py-6 bg-272a2eff items-center cursor-pointer relative">
            <h4 className="text-primary-2 font-normal text-[15px]">
              24h variation
            </h4>
            {orderPercent === 'desc' && (
              <OrderClick
                onClick={() => {
                  setOrderPrices('default');
                  setOrderPercent('asc');
                }}
              >
                <FaArrowDownShortWide />
              </OrderClick>
            )}
            {orderPercent === 'asc' && (
              <OrderClick
                onClick={() => {
                  setOrderPrices('default');
                  setOrderPercent('default');
                }}
              >
                <FaArrowDownWideShort />
              </OrderClick>
            )}
            {orderPercent === 'default' && (
              <OrderClick
                onClick={() => {
                  setOrderPrices('default');
                  setOrderPercent('desc');
                }}
              >
                <TbArrowsUpDown />
              </OrderClick>
            )}
          </div>
          {stDataCryptos.map(val => (
            <div
              className={`flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-black-section-2 ${hanldeAddpercentColor(
                val.CHANGEPCTDAY
              )} font-normal text-sm h-[79px]`}
              key={val.NAME}
            >
              {handleCalcVwap24HrAndPercent(val.CHANGEPCTDAY)}
            </div>
          ))}
        </div>
        <div className="flex flex-col w-full">
          <div className="px-4 py-6 bg-272a2eff h-[70.5px]"></div>
          {stDataCryptos.map(val => (
            <div
              className="flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-black-section-2 text-primary font-normal text-sm h-[79px]"
              key={val.NAME}
            >
              <GraphicLine fsym={val.FROMSYMBOL} />
            </div>
          ))}
        </div>
      </div>
      <Link
        href="/negotiate"
        className="text-sm text-primary hover:underline font-normal hover:text-blue transition-colors duration-200 w-fit"
      >{`Check out other crypto assets`}</Link>
    </section>
  );
}

function OrderClick({
  onClick,
  children,
  price,
}: {
  onClick: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
  price?: boolean;
}) {
  return (
    <div
      className=" absolute w-full h-full flex items-center"
      onClick={onClick}
    >
      <div
        // eslint-disable-next-line
        className={`w-[18px] h-[18px] fill-primary-2 stroke-primary-2 flex items-center justify-center flex-none absolute ${price ? 'left-[45px]' : 'left-[106px]'}`}
      >
        {children}
      </div>
    </div>
  );
}
