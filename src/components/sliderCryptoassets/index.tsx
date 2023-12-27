'use client';

import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { Autoplay, Pagination } from 'swiper/modules';
import Link from 'next/link';

import { CryptoType } from '../header';

export default function SliderCryptoassets({
  dataCryptoassets,
}: {
  dataCryptoassets: CryptoType[];
}) {
  const [data, setData] = useState<CryptoType[][]>([]);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (initialRender) {
      const subArrs = [];
      const subArrLenght = 5;

      for (let i = 0; i < dataCryptoassets.length; i += subArrLenght) {
        const subArr = dataCryptoassets.slice(i, i + subArrLenght);
        subArrs.push(subArr);
      }
      setData(subArrs);
      setInitialRender(false);
    }
  }, [initialRender, data, dataCryptoassets]);

  const handleonSlideChange = () => {
    const lines = document.querySelectorAll('.recharts-line');
    lines.forEach(line => {
      line.classList.add('animate-sliderUp');
      setTimeout(() => {
        line.classList.remove('animate-sliderUp');
      }, 800);
    });
  };

  return (
    <Swiper
      spaceBetween={30}
      // slidesPerView={1}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      onSlideChange={handleonSlideChange}
      pagination={{
        clickable: true,
      }}
      navigation={false}
      loop={true}
      modules={[Pagination, Autoplay]}
      style={{
        width: '100%',
        height: '426px',
      }}
    >
      {data.map((valData, index) => (
        <SwiperSlide
          key={index.toString()}
          style={{
            width: '100%',
          }}
        >
          <div className="mt-8 w-ful flex w-full">
            <SliderNameAndSymbol keyVal="NAME" title="Name" valData={valData} />
            <SliderNameAndSymbol
              keyVal="FROMSYMBOL"
              title="Ticker"
              valData={valData}
            />
            <SliderPriceUsd valData={valData} />
            <SliderChangePercent24Hr valData={valData} />
            <SliderGraphicLine valData={valData} />
            <SliderBuyNow valData={valData} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function SliderNameAndSymbol({
  title,
  valData,
  keyVal,
}: {
  title: string;
  valData: CryptoType[];
  keyVal: keyof CryptoType;
}) {
  return (
    <div className="flex flex-col w-full">
      <h3 className="text-black font-semibold text-base border-b-2 border-black border-solid w-full text-left pl-4 pb-3">
        {title}
      </h3>
      {valData.map((val, index) => (
        <span
          key={index.toString()}
          className="text-[15px] font-normal whitespace-nowrap text-left pl-4 py-5 border-b-1 border-gray-00000033"
        >
          {val[keyVal]}
        </span>
      ))}
    </div>
  );
}

function SliderPriceUsd({ valData }: { valData: CryptoType[] }) {
  const handlePriceUsd = (val: CryptoType) => {
    return val.PRICE.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-black font-semibold text-base border-b-2 border-black border-solid w-full text-left pl-4 pb-3">
        Price (USD)
      </h3>
      {valData.map((val, index) => (
        <span
          key={index.toString()}
          className="text-[15px] font-normal whitespace-nowrap text-left pl-4 py-5 border-b-1 border-gray-00000033"
        >
          {handlePriceUsd(val)}
        </span>
      ))}
    </div>
  );
}

function SliderChangePercent24Hr({ valData }: { valData: CryptoType[] }) {
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

  const handlePrice24Hour = (val: CryptoType) => {
    const CHANGEDAYString = val.CHANGEDAY.toString();
    const minimumFractionDigits = handleFormatPriceAndPercent(CHANGEDAYString);

    return val.CHANGEDAY.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits,
    });
  };

  const handleCalcVwap24HrAndPercent = (val: CryptoType) => {
    const CHANGEPCTDAYString = val.CHANGEPCTDAY.toString();
    const minimumFractionDigits =
      handleFormatPriceAndPercent(CHANGEPCTDAYString);

    return `${handlePrice24Hour(val)} (${val.CHANGEPCTDAY.toFixed(
      minimumFractionDigits
    ).replaceAll('-', '')}%)`;
  };

  const hanldeAddpercentColor = (val: CryptoType) => {
    // eslint-disable-next-line
    return `${!handleCalcVwap24HrAndPercent(val).includes('-') ? 'text-blue' : 'text-red-graphic'}`;
  };

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-black font-semibold text-base border-b-2 border-black border-solid w-full text-left pl-4 pb-3">
        24H Variation
      </h3>
      {valData.map((val, index) => (
        <span
          key={index.toString()}
          className={`${hanldeAddpercentColor(
            val
          )} text-[15px] font-normal whitespace-nowrap text-left pl-4 py-5 border-b-1 border-gray-00000033`}
        >
          {handleCalcVwap24HrAndPercent(val).includes('-')
            ? handleCalcVwap24HrAndPercent(val)
            : `+${handleCalcVwap24HrAndPercent(val)}`}
        </span>
      ))}
    </div>
  );
}

function SliderGraphicLine({ valData }: { valData: CryptoType[] }) {
  return (
    <div className="flex flex-col pb-4 w-full items-center">
      <h3 className="text-black font-semibold text-base border-b-2 border-black border-solid w-full text-left pl-4 pb-3">
        Graphic
      </h3>
      {valData.map((val, index) => (
        <GraphicLine key={index.toString()} fsym={val.FROMSYMBOL} />
      ))}
    </div>
  );
}
function GraphicLine({ fsym }: { fsym: string }) {
  const [cryptoData, setcryptoData] = useState<
    {
      timestamp: number;
      close: number;
      open: number;
    }[]
  >([]);

  const limit = new Date().getUTCHours();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CRYPTO_API_URL_HISTOHOUR}&fsym=${fsym}&limit=${limit}`,
          {
            method: 'GET',
            next: { revalidate: 60 },
          }
        );
        const data = await response.json();
        const chartData = data.Data.Data.map(
          ({
            time,
            close,
            open,
          }: {
            time: number;
            close: number;
            open: number;
          }) => ({
            timestamp: time * 1000,
            close,
            open,
          })
        );
        setcryptoData(chartData);
      } catch (error) {
        // console.error('Error fetching Bitcoin data:', error);
      }
    };

    fetchData();
  }, [fsym, limit]);

  if (!cryptoData.length) return;

  return (
    <ResponsiveContainer
      width="100%"
      height={63.3}
      className="border-b-1 border-gray-00000033 border-solid"
    >
      <LineChart
        data={cryptoData}
        margin={{ top: 20, left: 16, bottom: 20, right: 16 }}
      >
        <XAxis dataKey="timestamp" hide />
        <YAxis type="number" domain={['auto', 'auto']} hide />
        <Line
          type="monotone"
          dataKey="open"
          // className="animate-sliderUp"
          stroke={
            cryptoData[0].open > cryptoData[cryptoData.length - 1].close
              ? '#f76970ff'
              : '#549cffff'
          }
          dot={false}
        />
        <ReferenceLine
          y={cryptoData[0].open}
          stroke="#999"
          strokeDasharray="2 2"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function SliderBuyNow({ valData }: { valData: CryptoType[] }) {
  return (
    <div className="flex flex-col pb-4 w-full items-center mt-6">
      <h3 className="text-black font-semibold text-base border-b-2 border-black border-solid w-full text-left pl-4 pb-3"></h3>
      {valData.map((val, index) => (
        <div
          key={index.toString()}
          className="border-b-1 border-gray-00000033 border-solid py-2 w-full pl-4"
        >
          <Link
            href="/login"
            className="whitespace-nowrap w-48 flex justify-center items-center py-5 bg-blue text-sm text-black h-[46.5px] p-4 rounded hover:bg-bluehover hover:text-primary transition-colors duration-200"
          >
            Buy now
          </Link>
        </div>
      ))}
    </div>
  );
}
