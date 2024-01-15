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
import { useRouter } from 'next/navigation';

import { CryptoType } from '../header';
import { GraphicLine } from '../sliderCryptoassets';
import { HistorHourType } from '@/app/home/page';

type OrderType = 'desc' | 'asc' | 'default';

export default function FollowMarket({
  dataCryptos,
  dataHistoHour,
}: {
  dataCryptos: CryptoType[];
  dataHistoHour: HistorHourType[][];
}) {
  const router = useRouter();

  const [stDataCryptos, setStDataCryptos] = useState(dataCryptos.slice(0, 10));
  const [orderPrices, setOrderPrices] = useState<OrderType>('default');
  const [orderPercent, setOrderPercent] = useState<OrderType>('default');

  useEffect(() => {
    if (orderPrices === 'desc') {
      const newArrDataCryptos = [...dataCryptos];
      setStDataCryptos(
        newArrDataCryptos.sort((a, b) => a.PRICE - b.PRICE).slice(0, 10)
      );
      return;
    }
    if (orderPrices === 'asc') {
      const newArrDataCryptos = [...dataCryptos];
      setStDataCryptos(
        newArrDataCryptos.sort((a, b) => b.PRICE - a.PRICE).slice(0, 10)
      );
      return;
    }
    if (orderPercent === 'desc') {
      const newArrDataCryptos = [...dataCryptos];
      setStDataCryptos(
        newArrDataCryptos
          .sort((a, b) => a.CHANGEPCTDAY - b.CHANGEPCTDAY)
          .slice(0, 10)
      );
      return;
    }
    if (orderPercent === 'asc') {
      const newArrDataCryptos = [...dataCryptos];
      setStDataCryptos(
        newArrDataCryptos
          .sort((a, b) => b.CHANGEPCTDAY - a.CHANGEPCTDAY)
          .slice(0, 10)
      );
      return;
    }

    setStDataCryptos(dataCryptos.slice(0, 10));
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
    const indexFloatPoint = value.indexOf('.');
    if (parseInt(value.slice(0, indexFloatPoint)) > 0) return 2;

    const CHANGEDAYNextFloatPoint = value.slice(indexFloatPoint + 1);
    const minimumFractionDigits =
      CHANGEDAYNextFloatPoint.slice(0, 2) === '00'
        ? CHANGEDAYNextFloatPoint.slice(0, 3) === '000'
          ? CHANGEDAYNextFloatPoint.slice(0, 4) === '0000'
            ? CHANGEDAYNextFloatPoint.slice(0, 10) === '00000'
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

  const handleClearDataHistoHour = (FROMSYMBOL: string) => {
    return dataHistoHour
      .map(mval => mval.filter(fval => fval.FROMSYMBOL === FROMSYMBOL))
      .flat();
  };

  return (
    <section className="w-full flex flex-col gap-4 mt-6">
      <h2 className="text-2xl text-primary font-normal">Follow the Market</h2>
      <table className="rounded-md overflow-hidden w-full table-auto">
        <thead>
          <tr className="w-full flex">
            <th className="flex gap-2 px-4 py-6 bg-272a2eff items-center cursor-default w-1/4">
              <h4 className="text-primary-2 font-normal text-[15px]">
                Cryptos
              </h4>
            </th>
            {orderPrices === 'desc' && (
              <OrderClick
                orderPrices={orderPrices}
                textFiled="Prices"
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
                orderPrices={orderPrices}
                textFiled="Prices"
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
                orderPrices={orderPrices}
                textFiled="Prices"
                onClick={() => {
                  setOrderPercent('default');
                  setOrderPrices('desc');
                }}
              >
                <TbArrowsUpDown />
              </OrderClick>
            )}

            {orderPercent === 'desc' && (
              <OrderClick
                orderPercent={orderPercent}
                textFiled="24h variation"
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
                orderPercent={orderPercent}
                textFiled="24h variation"
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
                orderPercent={orderPercent}
                textFiled="24h variation"
                onClick={() => {
                  setOrderPrices('default');
                  setOrderPercent('desc');
                }}
              >
                <TbArrowsUpDown />
              </OrderClick>
            )}
            <th className=" w-1/4 px-4 py-6 bg-272a2eff h-[70.5px]">
              <h4 className="text-primary-2 font-normal text-[15px]">
                H1 Graphic
              </h4>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            className="w-full flex hover:bg-383b3eff transition-colors duration-200 cursor-pointer bg-black-section-2"
            onClick={() =>
              router.push(
                `/negotiate/crypto/${stDataCryptos[0].FROMSYMBOL.toLowerCase()}`
              )
            }
          >
            <th className="flex w-1/4 items-center gap-[5px] border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit h-[79px]">
              <Image
                width={30}
                height={30}
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}${stDataCryptos[0].IMAGEURL}`}
                alt={stDataCryptos[0].NAME}
                className="rounded-full"
              />
              <span className="text-primary text-[15px] font-medium">
                {stDataCryptos[0].FROMSYMBOL}
              </span>
              <span className="text-primary text-sm font-normal opacity-70">
                {stDataCryptos[0].NAME}
              </span>
            </th>
            <th className="w-1/4 flex items-center border-t-1 border-solid border-34383cff bg-inherit px-4 py-6 text-primary font-normal text-sm h-[79px]">
              {handleFormatPrice(stDataCryptos[0].PRICE)}
            </th>
            <th
              className={`w-1/4 flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit ${hanldeAddpercentColor(
                stDataCryptos[0].CHANGEPCTDAY
              )} font-normal text-sm h-[79px]`}
            >
              {handleCalcVwap24HrAndPercent(stDataCryptos[0].CHANGEPCTDAY)}
            </th>
            <th className="w-1/4 flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit text-primary font-normal text-sm h-[79px]">
              <GraphicLine
                cryptoData={handleClearDataHistoHour(
                  stDataCryptos[0].FROMSYMBOL
                )}
                CHANGEPCTDAY={stDataCryptos[0].CHANGEPCTDAY}
              />
            </th>
          </tr>
          <tr
            className="w-full flex hover:bg-383b3eff transition-colors duration-200 cursor-pointer bg-black-section-2"
            onClick={() =>
              router.push(
                `/negotiate/crypto/${stDataCryptos[1].FROMSYMBOL.toLowerCase()}`
              )
            }
          >
            <th className="flex w-1/4 items-center gap-[5px] border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit h-[79px]">
              <Image
                width={30}
                height={30}
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}${stDataCryptos[1].IMAGEURL}`}
                alt={stDataCryptos[1].NAME}
                className="rounded-full"
              />
              <span className="text-primary text-[15px] font-medium">
                {stDataCryptos[1].FROMSYMBOL}
              </span>
              <span className="text-primary text-sm font-normal opacity-70">
                {stDataCryptos[1].NAME}
              </span>
            </th>
            <th className="w-1/4 flex items-center border-t-1 border-solid border-34383cff bg-inherit px-4 py-6 text-primary font-normal text-sm h-[79px]">
              {handleFormatPrice(stDataCryptos[1].PRICE)}
            </th>
            <th
              className={`w-1/4 flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit ${hanldeAddpercentColor(
                stDataCryptos[1].CHANGEPCTDAY
              )} font-normal text-sm h-[79px]`}
            >
              {handleCalcVwap24HrAndPercent(stDataCryptos[1].CHANGEPCTDAY)}
            </th>
            <th className="w-1/4 flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit text-primary font-normal text-sm h-[79px]">
              <GraphicLine
                cryptoData={handleClearDataHistoHour(
                  stDataCryptos[1].FROMSYMBOL
                )}
                CHANGEPCTDAY={stDataCryptos[1].CHANGEPCTDAY}
              />
            </th>
          </tr>
          <tr
            className="w-full flex hover:bg-383b3eff transition-colors duration-200 cursor-pointer bg-black-section-2"
            onClick={() =>
              router.push(
                `/negotiate/crypto/${stDataCryptos[2].FROMSYMBOL.toLowerCase()}`
              )
            }
          >
            <th className="flex w-1/4 items-center gap-[5px] border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit h-[79px]">
              <Image
                width={30}
                height={30}
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}${stDataCryptos[2].IMAGEURL}`}
                alt={stDataCryptos[2].NAME}
                className="rounded-full"
              />
              <span className="text-primary text-[15px] font-medium">
                {stDataCryptos[2].FROMSYMBOL}
              </span>
              <span className="text-primary text-sm font-normal opacity-70">
                {stDataCryptos[2].NAME}
              </span>
            </th>
            <th className="w-1/4 flex items-center border-t-1 border-solid border-34383cff bg-inherit px-4 py-6 text-primary font-normal text-sm h-[79px]">
              {handleFormatPrice(stDataCryptos[2].PRICE)}
            </th>
            <th
              className={`w-1/4 flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit ${hanldeAddpercentColor(
                stDataCryptos[2].CHANGEPCTDAY
              )} font-normal text-sm h-[79px]`}
            >
              {handleCalcVwap24HrAndPercent(stDataCryptos[2].CHANGEPCTDAY)}
            </th>
            <th className="w-1/4 flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit text-primary font-normal text-sm h-[79px]">
              <GraphicLine
                cryptoData={handleClearDataHistoHour(
                  stDataCryptos[2].FROMSYMBOL
                )}
                CHANGEPCTDAY={stDataCryptos[2].CHANGEPCTDAY}
              />
            </th>
          </tr>
          <tr
            className="w-full flex hover:bg-383b3eff transition-colors duration-200 cursor-pointer bg-black-section-2"
            onClick={() =>
              router.push(
                `/negotiate/crypto/${stDataCryptos[3].FROMSYMBOL.toLowerCase()}`
              )
            }
          >
            <th className="flex w-1/4 items-center gap-[5px] border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit h-[79px]">
              <Image
                width={30}
                height={30}
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}${stDataCryptos[3].IMAGEURL}`}
                alt={stDataCryptos[3].NAME}
                className="rounded-full"
              />
              <span className="text-primary text-[15px] font-medium">
                {stDataCryptos[3].FROMSYMBOL}
              </span>
              <span className="text-primary text-sm font-normal opacity-70">
                {stDataCryptos[3].NAME}
              </span>
            </th>
            <th className="w-1/4 flex items-center border-t-1 border-solid border-34383cff bg-inherit px-4 py-6 text-primary font-normal text-sm h-[79px]">
              {handleFormatPrice(stDataCryptos[3].PRICE)}
            </th>
            <th
              className={`w-1/4 flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit ${hanldeAddpercentColor(
                stDataCryptos[3].CHANGEPCTDAY
              )} font-normal text-sm h-[79px]`}
            >
              {handleCalcVwap24HrAndPercent(stDataCryptos[3].CHANGEPCTDAY)}
            </th>
            <th className="w-1/4 flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit text-primary font-normal text-sm h-[79px]">
              <GraphicLine
                cryptoData={handleClearDataHistoHour(
                  stDataCryptos[3].FROMSYMBOL
                )}
                CHANGEPCTDAY={stDataCryptos[3].CHANGEPCTDAY}
              />
            </th>
          </tr>
          <tr
            className="w-full flex hover:bg-383b3eff transition-colors duration-200 cursor-pointer bg-black-section-2"
            onClick={() =>
              router.push(
                `/negotiate/crypto/${stDataCryptos[4].FROMSYMBOL.toLowerCase()}`
              )
            }
          >
            <th className="flex w-1/4 items-center gap-[5px] border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit h-[79px]">
              <Image
                width={30}
                height={30}
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}${stDataCryptos[4].IMAGEURL}`}
                alt={stDataCryptos[4].NAME}
                className="rounded-full"
              />
              <span className="text-primary text-[15px] font-medium">
                {stDataCryptos[4].FROMSYMBOL}
              </span>
              <span className="text-primary text-sm font-normal opacity-70">
                {stDataCryptos[4].NAME}
              </span>
            </th>
            <th className="w-1/4 flex items-center border-t-1 border-solid border-34383cff bg-inherit px-4 py-6 text-primary font-normal text-sm h-[79px]">
              {handleFormatPrice(stDataCryptos[4].PRICE)}
            </th>
            <th
              className={`w-1/4 flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit ${hanldeAddpercentColor(
                stDataCryptos[4].CHANGEPCTDAY
              )} font-normal text-sm h-[79px]`}
            >
              {handleCalcVwap24HrAndPercent(stDataCryptos[4].CHANGEPCTDAY)}
            </th>
            <th className="w-1/4 flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit text-primary font-normal text-sm h-[79px]">
              <GraphicLine
                cryptoData={handleClearDataHistoHour(
                  stDataCryptos[4].FROMSYMBOL
                )}
                CHANGEPCTDAY={stDataCryptos[4].CHANGEPCTDAY}
              />
            </th>
          </tr>

          <tr
            className="w-full flex hover:bg-383b3eff transition-colors duration-200 cursor-pointer bg-black-section-2"
            onClick={() =>
              router.push(
                `/negotiate/crypto/${stDataCryptos[5].FROMSYMBOL.toLowerCase()}`
              )
            }
          >
            <th className="flex w-1/4 items-center gap-[5px] border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit h-[79px]">
              <Image
                width={30}
                height={30}
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}${stDataCryptos[5].IMAGEURL}`}
                alt={stDataCryptos[5].NAME}
                className="rounded-full"
              />
              <span className="text-primary text-[15px] font-medium">
                {stDataCryptos[5].FROMSYMBOL}
              </span>
              <span className="text-primary text-sm font-normal opacity-70">
                {stDataCryptos[5].NAME}
              </span>
            </th>
            <th className="w-1/4 flex items-center border-t-1 border-solid border-34383cff bg-inherit px-4 py-6 text-primary font-normal text-sm h-[79px]">
              {handleFormatPrice(stDataCryptos[5].PRICE)}
            </th>
            <th
              className={`w-1/4 flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit ${hanldeAddpercentColor(
                stDataCryptos[5].CHANGEPCTDAY
              )} font-normal text-sm h-[79px]`}
            >
              {handleCalcVwap24HrAndPercent(stDataCryptos[5].CHANGEPCTDAY)}
            </th>
            <th className="w-1/4 flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit text-primary font-normal text-sm h-[79px]">
              <GraphicLine
                cryptoData={handleClearDataHistoHour(
                  stDataCryptos[5].FROMSYMBOL
                )}
                CHANGEPCTDAY={stDataCryptos[5].CHANGEPCTDAY}
              />
            </th>
          </tr>
          <tr
            className="w-full flex hover:bg-383b3eff transition-colors duration-200 cursor-pointer bg-black-section-2"
            onClick={() =>
              router.push(
                `/negotiate/crypto/${stDataCryptos[6].FROMSYMBOL.toLowerCase()}`
              )
            }
          >
            <th className="flex w-1/4 items-center gap-[5px] border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit h-[79px]">
              <Image
                width={30}
                height={30}
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}${stDataCryptos[6].IMAGEURL}`}
                alt={stDataCryptos[6].NAME}
                className="rounded-full"
              />
              <span className="text-primary text-[15px] font-medium">
                {stDataCryptos[6].FROMSYMBOL}
              </span>
              <span className="text-primary text-sm font-normal opacity-70">
                {stDataCryptos[6].NAME}
              </span>
            </th>
            <th className="w-1/4 flex items-center border-t-1 border-solid border-34383cff bg-inherit px-4 py-6 text-primary font-normal text-sm h-[79px]">
              {handleFormatPrice(stDataCryptos[6].PRICE)}
            </th>
            <th
              className={`w-1/4 flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit ${hanldeAddpercentColor(
                stDataCryptos[6].CHANGEPCTDAY
              )} font-normal text-sm h-[79px]`}
            >
              {handleCalcVwap24HrAndPercent(stDataCryptos[6].CHANGEPCTDAY)}
            </th>
            <th className="w-1/4 flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit text-primary font-normal text-sm h-[79px]">
              <GraphicLine
                cryptoData={handleClearDataHistoHour(
                  stDataCryptos[6].FROMSYMBOL
                )}
                CHANGEPCTDAY={stDataCryptos[6].CHANGEPCTDAY}
              />
            </th>
          </tr>
          <tr
            className="w-full flex hover:bg-383b3eff transition-colors duration-200 cursor-pointer bg-black-section-2"
            onClick={() =>
              router.push(
                `/negotiate/crypto/${stDataCryptos[7].FROMSYMBOL.toLowerCase()}`
              )
            }
          >
            <th className="flex w-1/4 items-center gap-[5px] border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit h-[79px]">
              <Image
                width={30}
                height={30}
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}${stDataCryptos[7].IMAGEURL}`}
                alt={stDataCryptos[7].NAME}
                className="rounded-full"
              />
              <span className="text-primary text-[15px] font-medium">
                {stDataCryptos[7].FROMSYMBOL}
              </span>
              <span className="text-primary text-sm font-normal opacity-70">
                {stDataCryptos[7].NAME}
              </span>
            </th>
            <th className="w-1/4 flex items-center border-t-1 border-solid border-34383cff bg-inherit px-4 py-6 text-primary font-normal text-sm h-[79px]">
              {handleFormatPrice(stDataCryptos[7].PRICE)}
            </th>
            <th
              className={`w-1/4 flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit ${hanldeAddpercentColor(
                stDataCryptos[7].CHANGEPCTDAY
              )} font-normal text-sm h-[79px]`}
            >
              {handleCalcVwap24HrAndPercent(stDataCryptos[7].CHANGEPCTDAY)}
            </th>
            <th className="w-1/4 flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit text-primary font-normal text-sm h-[79px]">
              <GraphicLine
                cryptoData={handleClearDataHistoHour(
                  stDataCryptos[7].FROMSYMBOL
                )}
                CHANGEPCTDAY={stDataCryptos[7].CHANGEPCTDAY}
              />
            </th>
          </tr>
          <tr
            className="w-full flex hover:bg-383b3eff transition-colors duration-200 cursor-pointer bg-black-section-2"
            onClick={() =>
              router.push(
                `/negotiate/crypto/${stDataCryptos[8].FROMSYMBOL.toLowerCase()}`
              )
            }
          >
            <th className="flex w-1/4 items-center gap-[5px] border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit h-[79px]">
              <Image
                width={30}
                height={30}
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}${stDataCryptos[8].IMAGEURL}`}
                alt={stDataCryptos[8].NAME}
                className="rounded-full"
              />
              <span className="text-primary text-[15px] font-medium">
                {stDataCryptos[8].FROMSYMBOL}
              </span>
              <span className="text-primary text-sm font-normal opacity-70">
                {stDataCryptos[8].NAME}
              </span>
            </th>
            <th className="w-1/4 flex items-center border-t-1 border-solid border-34383cff bg-inherit px-4 py-6 text-primary font-normal text-sm h-[79px]">
              {handleFormatPrice(stDataCryptos[8].PRICE)}
            </th>
            <th
              className={`w-1/4 flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit ${hanldeAddpercentColor(
                stDataCryptos[8].CHANGEPCTDAY
              )} font-normal text-sm h-[79px]`}
            >
              {handleCalcVwap24HrAndPercent(stDataCryptos[8].CHANGEPCTDAY)}
            </th>
            <th className="w-1/4 flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit text-primary font-normal text-sm h-[79px]">
              <GraphicLine
                cryptoData={handleClearDataHistoHour(
                  stDataCryptos[8].FROMSYMBOL
                )}
                CHANGEPCTDAY={stDataCryptos[8].CHANGEPCTDAY}
              />
            </th>
          </tr>
          <tr
            className="w-full flex hover:bg-383b3eff transition-colors duration-200 cursor-pointer bg-black-section-2"
            onClick={() =>
              router.push(
                `/negotiate/crypto/${stDataCryptos[9].FROMSYMBOL.toLowerCase()}`
              )
            }
          >
            <th className="flex w-1/4 items-center gap-[5px] border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit h-[79px]">
              <Image
                width={30}
                height={30}
                src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}${stDataCryptos[9].IMAGEURL}`}
                alt={stDataCryptos[9].NAME}
                className="rounded-full"
              />
              <span className="text-primary text-[15px] font-medium">
                {stDataCryptos[9].FROMSYMBOL}
              </span>
              <span className="text-primary text-sm font-normal opacity-70">
                {stDataCryptos[9].NAME}
              </span>
            </th>
            <th className="w-1/4 flex items-center border-t-1 border-solid border-34383cff bg-inherit px-4 py-6 text-primary font-normal text-sm h-[79px]">
              {handleFormatPrice(stDataCryptos[9].PRICE)}
            </th>
            <th
              className={`w-1/4 flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit ${hanldeAddpercentColor(
                stDataCryptos[9].CHANGEPCTDAY
              )} font-normal text-sm h-[79px]`}
            >
              {handleCalcVwap24HrAndPercent(stDataCryptos[9].CHANGEPCTDAY)}
            </th>
            <th className="w-1/4 flex items-center border-t-1 border-solid border-34383cff px-4 py-6 bg-inherit text-primary font-normal text-sm h-[79px]">
              <GraphicLine
                cryptoData={handleClearDataHistoHour(
                  stDataCryptos[9].FROMSYMBOL
                )}
                CHANGEPCTDAY={stDataCryptos[9].CHANGEPCTDAY}
              />
            </th>
          </tr>
        </tbody>
      </table>
      <Link
        href="/negotiate"
        className="text-sm text-primary hover:underline font-normal hover:text-blue transition-colors duration-200 w-fit"
      >{`Check out other crypto assets >`}</Link>
    </section>
  );
}

function OrderClick({
  textFiled,
  onClick,
  children,
  orderPrices,
  orderPercent,
}: {
  textFiled: string;
  onClick: MouseEventHandler<HTMLElement>;
  children: ReactNode;
  orderPrices?: OrderType;
  orderPercent?: OrderType;
}) {
  return (
    <th
      // eslint-disable-next-line
      className={`w-1/4 flex gap-2 px-4 py-6 items-center cursor-pointer ${(orderPrices || orderPercent) !== 'default' ? 'bg-black-section-2' : 'hover:bg-black-section-2 transition-colors duration-200 bg-272a2eff'}`}
      onClick={onClick}
    >
      <h4 className="text-primary-2 font-normal text-[15px]">{textFiled}</h4>
      <div
        // eslint-disable-next-line
        className={`w-[18px] h-[18px] fill-primary-2 stroke-primary-2 flex items-center justify-center flex-none`}
      >
        {children}
      </div>
    </th>
  );
}
