/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
} from 'react';
import { IoMdTime } from 'react-icons/io';
import { useTimer } from 'react-timer-hook';
import Link from 'next/link';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa6';
import { BsCashCoin } from 'react-icons/bs';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { CryptoType } from '@/components/header';
import formatPrice from '@/services/formatPrice';
import { ChangePctDay } from '../../cryptosNegotiate';
import cryptoFee from '@/services/cryptoFee';
import SkeletonUi from '@/components/skeletonUI';
import { HistorHourType } from '@/app/home/page';
import getDaysAgoData from '@/services/getDaysAgoData';

interface Props {
  cryptoSymbol: string;
  cryptoName: string;
}

interface CryptoTimeType {
  time: number;
  type: 'hour' | 'day' | 'months' | 'ytd';
  value: string;
}

export default function Graphic({ cryptoSymbol, cryptoName }: Props) {
  const { seconds, restart, isRunning } = useTimer({
    expiryTimestamp: new Date(Date.now() + 30000),
    autoStart: true,
  });
  const [initialRender, setIntialRender] = useState(true);
  const [cryptoData, setCryptoData] = useState<CryptoType | null>();
  const [cryptoDataHisto, setCryptoDataHisto] = useState<
    HistorHourType[] | null
  >();
  let cryptoTime = useRef<CryptoTimeType>({
    time: !new Date().getUTCHours() ? 1 : new Date().getUTCHours(),
    type: 'hour',
    value: '24h',
  });

  const handleGetDataCrypto = useCallback(async () => {
    try {
      const resCryptos = await fetch(
        `${process.env.NEXT_PUBLIC_CRYPTO_API_URL}&fsyms=${cryptoSymbol}`,
        {
          method: 'GET',
          cache: 'no-cache',
        }
      );
      const metaData = await resCryptos.json();
      const dataCryptos: CryptoType = metaData.RAW[cryptoSymbol].USD;
      setCryptoData(dataCryptos);
      restart(new Date(Date.now() + 30000), true);
    } catch (err) {
      console.log(err);
    }
  }, [cryptoSymbol, restart]);

  const handleGetDataCryptoHisto = useCallback(async () => {
    const hourApi = process.env.NEXT_PUBLIC_CRYPTO_API_URL_HISTOHOUR;
    const dayApi = process.env.NEXT_PUBLIC_CRYPTO_API_URL_HISTODAY;
    const resHistoHour = await fetch(
      `${cryptoTime.current.type === 'hour' ? hourApi : dayApi}&fsym=${cryptoSymbol}&limit=${cryptoTime.current.time}`, // eslint-disable-line
      {
        method: 'GET',
        cache: 'no-cache',
      }
    );
    const metaDataHisto = await resHistoHour.json();
    const dataHisto: HistorHourType[] = metaDataHisto.Data.Data?.map(
      ({ time, close, open }: HistorHourType) => ({
        time: +time * 1000,
        close,
        open,
        FROMSYMBOL: cryptoSymbol,
      })
    );
    setCryptoDataHisto(dataHisto);
  }, [cryptoSymbol, cryptoTime]);

  const handleSetNewCryptoPageData = useCallback(() => {
    setCryptoData(null);
    setCryptoDataHisto(null);
    handleGetDataCrypto();
    handleGetDataCryptoHisto();
  }, [handleGetDataCrypto, handleGetDataCryptoHisto]);

  useEffect(() => {
    if (initialRender) {
      handleGetDataCrypto();
      handleGetDataCryptoHisto();
      setIntialRender(false);
    }
  }, [handleGetDataCrypto, handleGetDataCryptoHisto, initialRender]);

  // useEffect(() => {
  //   if (!isRunning) {
  //     handleSetNewCryptoPageData();
  //   }
  // }, [isRunning, handleSetNewCryptoPageData]);

  const handleFormatTime = (value: number) => {
    return value > 9 ? `00:${value}` : `00:0${value}`;
  };

  return cryptoData && cryptoDataHisto ? (
    <>
      <div className="flex items-center gap-1 w-[60px] absolute right-20 top-[9.7rem]">
        <div className="flex-none fill-primary stroke-primary w-5 h-5 flex justify-center items-center">
          <IoMdTime />
        </div>
        <span className="text-xs font-normal text-primary">
          {handleFormatTime(seconds)}
        </span>
      </div>

      <div className="flex flex-col gap-5 w-[70%] mt-1">
        <div className="flex justify-between gap-4 items-center">
          <Image
            width={80}
            height={80}
            src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${cryptoData?.IMAGEURL}`}
            alt={cryptoName}
            className="flex-none -ml-3 rounded-full"
          />
          <span className="text-primary px-3 py-[4px] bg-464c51ff h-fit w-fit text-[11px] font-normal rounded-2xl">
            Cryptocurrency
          </span>
        </div>
        <div className="flex gap-1 flex-col">
          <div className="flex justify-between gap-4 items-center">
            <h2 className="text-primary font-normal text-2xl">
              {cryptoData.FROMSYMBOL.toUpperCase()}
            </h2>
            <span className="text-primary font-normal text-xl">
              {formatPrice(cryptoData.PRICE)}
            </span>
          </div>
          <div className="flex justify-between gap-4 items-center">
            <span className="text-primary font-normal text-[13px] opacity-70">
              {cryptoName}
            </span>
            <ChangePctDay changePctDay={cryptoData.CHANGEPCTDAY} />
          </div>
        </div>
        <div className="flex gap-1 flex-col">
          <div className="flex justify-between items-center">
            <span className="text-primary font-normal opacity-70 text-sm">
              Last buy price
            </span>
            <span className="text-primary font-normal opacity-70 text-sm">
              Last sell price
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-primary font-normal text-sm">
              {formatPrice(cryptoData.PRICE)}
            </span>
            <span className="text-primary font-normal text-sm">
              {formatPrice(cryptoData.PRICE * cryptoFee)}
            </span>
          </div>
        </div>
        <div className="w-full gap-4 flex">
          <Link
            href="/wallet/send"
            className="bg-272a2eff hover:bg-383b3eff transition-colors duration-200 px-4 py-2 text-primary text-sm font-normal rounded cursor-pointer flex gap-2 w-fit items-center"
          >
            <div className="w-3 h-3 mb-[1px] flex items-center justify-center flex-none fill-primary">
              <FaArrowUp />
            </div>
            Send
          </Link>
          <Link
            href="/wallet/receive"
            className="bg-272a2eff hover:bg-383b3eff transition-colors duration-200 px-4 py-2 text-primary text-sm font-normal rounded cursor-pointer flex gap-2 w-fit items-center"
          >
            <div className="w-3 h-3 mb-[1px] flex items-center justify-center flex-none fill-primary">
              <FaArrowDown />
            </div>
            Deposit
          </Link>
          <Link
            href="/wallet"
            className="bg-272a2eff hover:bg-383b3eff transition-colors duration-200 px-4 py-2 text-primary text-sm font-normal rounded cursor-pointer flex gap-2 w-fit items-center"
          >
            <div className="w-3 h-3 flex items-center justify-center flex-none fill-primary">
              <BsCashCoin />
            </div>
            Your wallet
          </Link>
        </div>

        <CryptoGraphic
          cryptoDataHisto={cryptoDataHisto}
          cryptoTime={cryptoTime}
        />
        <BtnsSelectTime
          cryptoTime={cryptoTime}
          handleSetNewCryptoPageData={handleSetNewCryptoPageData}
        />
      </div>
    </>
  ) : (
    <GraphicSkeleton />
  );
}

const CryptoGraphic = ({
  cryptoDataHisto,
  cryptoTime,
}: {
  cryptoDataHisto: HistorHourType[];
  cryptoTime: MutableRefObject<CryptoTimeType>;
}) => {
  function handleGetDaysMonths() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const daysMonth = lastDay.getDate();

    return daysMonth;
  }

  const handleStrokeLineGraph = () => {
    // console.log(CHANGEPCTDAY > 0);
    if (
      cryptoDataHisto[cryptoDataHisto.length - 1].close ===
      cryptoDataHisto[0].open
    )
      return '#999';
    if (
      cryptoDataHisto[cryptoDataHisto.length - 1].close >
      cryptoDataHisto[0].open
    )
      return '#549cffff';
    return '#f76970ff';
  };

  cryptoDataHisto = cryptoDataHisto.map(val => ({
    ...val,
    time: cryptoTime.current.type === 'hour' ? `${new Date(val.time).getHours()}h` : new Date(val.time).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', }), // eslint-disable-line
  }));
  let interval: number | undefined = 1;
  if (cryptoTime.current.value === '7d') interval = undefined;
  if (cryptoTime.current.value === '30d') interval = 2;
  if (cryptoTime.current.value === '12m') interval = handleGetDaysMonths();
  if (cryptoTime.current.value === 'ytd')
    interval = Math.floor(getDaysAgoData() / 12);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={cryptoDataHisto}
        margin={{
          top: -1,
          left: cryptoTime.current.value === '24h' ? -20 : 20,
          bottom: 0,
          right: 20,
        }}
      >
        <CartesianGrid strokeDasharray="0" stroke="#272a2eff" />
        <ReferenceLine y={0} stroke="none" />
        <XAxis
          dataKey="time"
          interval={interval}
          axisLine={false}
          tickLine={false}
          tick={{
            fill: '#fff',
            opacity: '0.7',
            fontSize: '13px',
            fontWeight: 300,
          }}
          tickSize={10}
        />
        <YAxis
          type="number"
          tickCount={7}
          domain={['auto', 'auto']}
          tickLine={{
            stroke: '#272a2eff',
          }}
          axisLine={false}
          tickSize={5}
          tickMargin={5}
          tick={<CustomizedAxisTick />}
          padding={{ top: 20, bottom: 20 }}
          orientation="right"
        />
        <Line
          type="monotone"
          dataKey="open"
          stroke={handleStrokeLineGraph()}
          dot={
            <CustomDot data={cryptoDataHisto} fill={handleStrokeLineGraph()} />
          }
          strokeWidth={2}
        />
        <ReferenceLine
          y={cryptoDataHisto[cryptoDataHisto.length - 1].open}
          stroke="#999"
          strokeDasharray="3 3"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const CustomizedAxisTick = (props: any) => {
  const { x, y, stroke, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={5}
        style={{
          fill: '#fff',
          opacity: '0.7',
          fontSize: '13px',
          fontWeight: 300,
        }}
      >
        {formatPrice(payload.value)}
      </text>
    </g>
  );
};

const CustomDot = (props: any) => {
  const { cx, cy, index, data, fill } = props;

  if (index === data.length - 1) {
    return (
      <circle cx={cx} cy={cy} r={4} fill={fill} className="animate-pulse" />
    );
  }

  return null;
};

const BtnsSelectTime = ({
  cryptoTime,
  handleSetNewCryptoPageData,
}: {
  cryptoTime: MutableRefObject<CryptoTimeType>;
  handleSetNewCryptoPageData(): void;
}) => {
  const handdleGetDaysFullYear = (year: number) => {
    const firstDay = new Date(year, 0, 1);
    const lastDay = new Date(year, 11, 31);
    const calc = +lastDay - +firstDay;
    const daysYear = Math.ceil(calc / (1000 * 60 * 60 * 24));
    return daysYear;
  };

  return (
    <div className="flex gap-6">
      <button
        type="button"
        className={`${cryptoTime.current.value === '24h' ? 'bg-464c51ff' : 'hover:bg-464c51ff hover:shadow-none shadow-effect-3'} transition-all  duration-200 text-[13px] font-normal text-primary py-[5px] px-3 rounded cursor-pointer`} // eslint-disable-line
        onClick={() => {
          cryptoTime.current = {
            time: !new Date().getUTCHours() ? 1 : new Date().getUTCHours(),
            type: 'hour',
            value: '24h',
          };
          handleSetNewCryptoPageData();
        }}
      >
        24h
      </button>
      <button
        type="button"
        className={`${cryptoTime.current.value === '7d' ? 'bg-464c51ff' : 'hover:bg-464c51ff hover:shadow-none shadow-effect-3'} transition-all  duration-200 text-[13px] font-normal text-primary py-[5px] px-3 rounded cursor-pointer`} // eslint-disable-line
        onClick={() => {
          cryptoTime.current = {
            time: 7,
            type: 'day',
            value: '7d',
          };
          handleSetNewCryptoPageData();
        }}
      >
        7 days
      </button>
      <button
        type="button"
        className={`${cryptoTime.current.value === '30d' ? 'bg-464c51ff' : 'hover:bg-464c51ff hover:shadow-none shadow-effect-3'} transition-all  duration-200 text-[13px] font-normal text-primary py-[5px] px-3 rounded cursor-pointer`} // eslint-disable-line
        onClick={() => {
          cryptoTime.current = {
            time: 30,
            type: 'day',
            value: '30d',
          };
          handleSetNewCryptoPageData();
        }}
      >
        30 days
      </button>
      <button
        type="button"
        className={`${cryptoTime.current.value === '12m' ? 'bg-464c51ff' : 'hover:bg-464c51ff hover:shadow-none shadow-effect-3'} transition-all  duration-200 text-[13px] font-normal text-primary py-[5px] px-3 rounded cursor-pointer`} // eslint-disable-line
        onClick={() => {
          cryptoTime.current = {
            time: handdleGetDaysFullYear(new Date().getFullYear()),
            type: 'day',
            value: '12m',
          };
          handleSetNewCryptoPageData();
        }}
      >
        12 months
      </button>
      <button
        type="button"
        className={`${cryptoTime.current.value === 'ytd' ? 'bg-464c51ff' : 'hover:bg-464c51ff hover:shadow-none shadow-effect-3'} transition-all  duration-200 text-[13px] font-normal text-primary py-[5px] px-3 rounded cursor-pointer`} // eslint-disable-line
        onClick={() => {
          cryptoTime.current = {
            time: getDaysAgoData(),
            type: 'day',
            value: 'ytd',
          };
          handleSetNewCryptoPageData();
        }}
      >
        YTD
      </button>
    </div>
  );
};

const GraphicSkeleton = () => {
  return (
    <>
      <div className="absolute right-20 top-[9.7rem]">
        <SkeletonUi width={60} height={20} />
      </div>

      <div className="flex flex-col gap-5 w-[70%] mt-1">
        <div className="flex justify-between gap-4 items-center">
          <SkeletonUi
            width={75}
            height={75}
            borderRadius="999px"
            variant="circular"
          />
          <SkeletonUi width={110} height={26} borderRadius="16px" />
        </div>
        <div className="flex gap-2 flex-col">
          <div className="flex justify-between gap-4 items-center">
            <SkeletonUi width={55} height={28} />
            <SkeletonUi width={100} height={28} />
          </div>

          <div className="flex justify-between gap-4 items-center">
            <SkeletonUi width={100} height={21} />
            <SkeletonUi width={55} height={21} />
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <div className="flex justify-between items-center">
            <SkeletonUi width={155} height={21} />
            <SkeletonUi width={155} height={21} />
          </div>
          <div className="flex justify-between items-center">
            <SkeletonUi width={100} height={24} />
            <SkeletonUi width={100} height={24} />
          </div>
        </div>
        <div className="w-full gap-4 flex">
          <SkeletonUi width={87} height={36} />
          <SkeletonUi width={105} height={36} />
          <SkeletonUi width={128} height={36} />
        </div>
      </div>
    </>
  );
};
