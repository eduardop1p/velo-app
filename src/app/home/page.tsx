import { Metadata } from 'next';
import { cookies } from 'next/headers';
// import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { IoMdTime } from 'react-icons/io';
import { DateTime } from 'luxon';

// const UserPatrimony = dynamic(() => import('@/components/userPatrimony'), {
//   ssr: false,
// });
import UserPatrimony from '@/components/userPatrimony';
import { CryptoType, ShowUserType } from '@/components/header';
import SlideMarketOverview from '@/components/slideMarketOverview';
import FollowMarket from '@/components/followMarket';
import formatDataCrypto from '@/services/formtaDataCrypto';

export const metadata: Metadata = {
  title: 'Bitcoin, Ethereum and other cryptocurrencies | Velo',
  description:
    'Buying and selling bitcoin, ethereum and other cryptoactives with the credibility of OP Financial Group. Open your account.',
};

export interface UserBalanceType {
  patrimony: string;
  invested: string;
}

export interface HistorHourType {
  time: number;
  close: number;
  open: number;
  FROMSYMBOL: string;
}

export interface MakertNewsType {
  id: string;
  imageurl: string;
  title: string;
  url: string;
  body: string;
  tags: string;
  categories: string;
  published_on: number;
  source_info: {
    name: string;
    img: string;
  };
}

export default async function Page() {
  const token = cookies().get('token')?.value;

  const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/show-user`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  });
  const userData = (await userRes.json()) as ShowUserType;
  const userBalance = {
    patrimony: userData.balance,
    invested: userData.invested,
  };

  const resCryptos = await fetch(
    `${process.env.CRYPTO_API_URL}&fsyms=BTC,DOGE,XLM,XRP,LTC,ETH,ADA,SOL,DOT,AVAX,ALGO,USDC,USDT,MATIC,OP,LINK,SAND,MANA,CRV,LDO,AAVE,UNI,MKR,SNX,COMP,QNT,ATOM,APE`,
    {
      method: 'GET',
      next: {
        revalidate: 60,
      },
    }
  );
  const metaData = await resCryptos.json();
  const dataCryptos = formatDataCrypto(
    'full-data',
    metaData.RAW
  ) as CryptoType[];

  const hourHtc = new Date().getUTCHours();
  const limit = !hourHtc ? 1 : hourHtc;
  const newDataHistoHour = [];
  for (let i = 0; i < dataCryptos.length; i++) {
    const resHistoHour = await fetch(
      `${process.env.NEXT_PUBLIC_CRYPTO_API_URL_HISTOHOUR}&fsym=${dataCryptos[i].FROMSYMBOL}&limit=${limit}`,
      {
        method: 'GET',
        next: { revalidate: 60 },
      }
    );
    const metaDataHistoHour = await resHistoHour.json();
    const dataHistoHour = metaDataHistoHour.Data.Data.map(
      ({ time, close, open }: HistorHourType) => ({
        timestamp: time * 1000,
        close,
        open,
        FROMSYMBOL: dataCryptos[i].FROMSYMBOL,
      })
    ) as HistorHourType[];
    newDataHistoHour.push(dataHistoHour);
  }

  const resNews = await fetch(
    `${process.env.NEXT_PUBLIC_NEWS}&sortOrder=popular&extraParams=velo`,
    {
      method: 'GET',
      next: { revalidate: 60 },
    }
  );
  const metaDataNews = await resNews.json();
  const dataMarketNews = metaDataNews.Data.slice(0, 6) as MakertNewsType[];

  const layer1Cryptos = dataCryptos.filter(val => {
    if (
      val.FROMSYMBOL === 'ETH' ||
      val.FROMSYMBOL === 'SOL' ||
      val.FROMSYMBOL === 'MATIC' ||
      val.FROMSYMBOL === 'OP' ||
      val.FROMSYMBOL === 'AVAX'
    )
      return val;
  });
  const defiCryptos = dataCryptos.filter(val => {
    if (
      val.FROMSYMBOL === 'LDO' ||
      val.FROMSYMBOL === 'SNX' ||
      val.FROMSYMBOL === 'MKR' ||
      val.FROMSYMBOL === 'UNI' ||
      val.FROMSYMBOL === 'AAVE'
    )
      return val;
  });
  const recommendedWallet1 = dataCryptos.filter(val => {
    if (
      val.FROMSYMBOL === 'SOL' ||
      val.FROMSYMBOL === 'OP' ||
      val.FROMSYMBOL === 'UNI' ||
      val.FROMSYMBOL === 'BTC'
    )
      return val;
  });

  const handleFormatDate = (value: number) => {
    return DateTime.fromMillis(value * 1000).toRelative({
      locale: 'en',
    });
  };

  return (
    <>
      <main className="mt-20">
        <div className="bg-black-section min-h-full-screen-80px px-20 py-10 flex flex-col gap-16 items-center w-full">
          <UserPatrimony userBalance={userBalance} />
          <SlideMarketOverview />
          <FollowMarket
            dataCryptos={dataCryptos}
            dataHistoHour={newDataHistoHour}
          />
          <section className="w-full flex flex-col gap-4">
            <h2 className="text-primary text-2xl font-normal">
              Crypto recommendations
            </h2>
            <div className="w-full flex justify-between gap-5">
              <Link
                className="w-1/3 p-6 rounded flex flex-col gap-1 bg-black-section-2 cursor-pointer group hover:bg-black-neutral-383b3eff transition-colors duration-200"
                href="/negotiate/recommendations/smart-contracts"
              >
                <div className="flex justify-between">
                  <h4 className="text-base font-normal text-primary">
                    Smart contracts
                  </h4>
                  <div className="bg-3d2d66ff text-primary font-normal text-xs flex items-center justify-center py-1 px-2 rounded-2xl">
                    Moderate
                  </div>
                </div>
                <p className="text-xs opacity-50 text-primary font-normal">
                  Smart Contract Networks
                </p>
                <div className="flex my-3 items-center">
                  <div className="relative rounded-full flex items-center justify-center bg-627eea w-[35px] h-[35px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${layer1Cryptos[0].IMAGEURL}`}
                      width={30}
                      height={30}
                      alt={layer1Cryptos[0].NAME}
                    />
                  </div>
                  <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-primary w-[35px] h-[35px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${layer1Cryptos[1].IMAGEURL}`}
                      width={30}
                      height={30}
                      alt={layer1Cryptos[1].NAME}
                    />
                  </div>
                  <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-ed3e43 w-[35px] h-[35px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${layer1Cryptos[2].IMAGEURL}`}
                      width={30}
                      height={30}
                      alt={layer1Cryptos[2].NAME}
                    />
                  </div>
                  <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-primary w-[35px] h-[35px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${layer1Cryptos[3].IMAGEURL}`}
                      width={30}
                      height={30}
                      alt={layer1Cryptos[3].NAME}
                    />
                  </div>
                  <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-ff0420 w-[35px] h-[35px]">
                    <span className="text-primary text-xs italic font-semibold">
                      OP
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs opacity-50 text-primary font-normal">
                    Minimum investment
                  </p>
                  <span className="text-primary text-[15px] font-medium">
                    $500.00
                  </span>
                </div>
                <span className="text-primary text-sm font-medium group-hover:text-blue group-hover:underline transition-all duration-200">{`Check out >`}</span>
              </Link>
              <Link
                className="w-1/3 p-6 rounded flex flex-col gap-1 bg-black-section-2 cursor-pointer group hover:bg-black-neutral-383b3eff transition-colors duration-200"
                href="/negotiate/recommendations/defi"
              >
                <div className="flex justify-between">
                  <h4 className="text-base font-normal text-primary">DeFi</h4>
                  <div className="bg-123570ff text-primary font-normal text-xs flex items-center justify-center py-1 px-2 rounded-2xl">
                    Sophisticated
                  </div>
                </div>
                <p className="text-xs opacity-50 text-primary font-normal">
                  Decentralized Finance
                </p>
                <div className="flex my-3 items-center">
                  <div className="relative rounded-full flex items-center justify-center bg-primary w-[35px] h-[35px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${defiCryptos[0].IMAGEURL}`}
                      width={30}
                      height={30}
                      alt={defiCryptos[0].NAME}
                    />
                  </div>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${defiCryptos[1].IMAGEURL}`}
                    width={35}
                    height={35}
                    alt={defiCryptos[1].NAME}
                    className="relative z-[2] -ml-2 rounded-full !object-none"
                  />
                  <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-primary w-[35px] h-[35px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${defiCryptos[2].IMAGEURL}`}
                      width={30}
                      height={30}
                      alt={defiCryptos[2].NAME}
                    />
                  </div>
                  <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-12d2b0 w-[35px] h-[35px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${defiCryptos[3].IMAGEURL}`}
                      width={30}
                      height={30}
                      alt={defiCryptos[3].NAME}
                    />
                  </div>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${defiCryptos[4].IMAGEURL}`}
                    width={35}
                    height={35}
                    alt={defiCryptos[4].NAME}
                    className="relative z-[2] -ml-2 rounded-full !object-none"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs opacity-50 text-primary font-normal">
                    Minimum investment
                  </p>
                  <span className="text-primary text-[15px] font-medium">
                    $250.00
                  </span>
                </div>
                <span className="text-primary text-sm font-medium group-hover:text-blue group-hover:underline transition-all duration-200">{`Check out >`}</span>
              </Link>
              <Link
                className="w-1/3 p-6 rounded flex flex-col gap-1 bg-black-section-2 cursor-pointer group hover:bg-black-neutral-383b3eff transition-colors duration-200"
                href="/negotiate/recommendations/wallet-1"
              >
                <div className="flex justify-between">
                  <h4 className="text-base font-normal text-primary">
                    Wallet recommendation
                  </h4>
                  <div className="bg-123570ff text-primary font-normal text-xs flex items-center justify-center py-1 px-2 rounded-2xl">
                    Sophisticated
                  </div>
                </div>
                <p className="text-xs opacity-50 text-primary font-normal">
                  Recommended Crypto Wallet
                </p>
                <div className="flex my-3 items-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${recommendedWallet1[0].IMAGEURL}`}
                    width={35}
                    height={35}
                    alt={recommendedWallet1[0].NAME}
                    className="rounded-full !object-none"
                  />
                  <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-primary w-[35px] h-[35px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${recommendedWallet1[1].IMAGEURL}`}
                      width={30}
                      height={30}
                      alt={recommendedWallet1[1].NAME}
                    />
                  </div>
                  <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-ff0420 w-[35px] h-[35px]">
                    <span className="text-primary text-xs italic font-semibold">
                      OP
                    </span>
                  </div>
                  <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-primary w-[35px] h-[35px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${recommendedWallet1[3].IMAGEURL}`}
                      width={30}
                      height={30}
                      alt={recommendedWallet1[3].NAME}
                    />
                  </div>
                  <div className="text-primary font-medium text-sm relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-34383cff w-[35px] h-[35px]">
                    +6
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs opacity-50 text-primary font-normal">
                    Minimum investment
                  </p>
                  <span className="text-primary text-[15px] font-medium">
                    $820.00
                  </span>
                </div>
                <span className="text-primary text-sm font-medium group-hover:text-blue group-hover:underline transition-all duration-200">{`Check out >`}</span>
              </Link>
            </div>
          </section>
          <section className="w-full flex flex-col gap-4">
            <h2 className="text-primary font-normal text-2xl">Market news</h2>
            <div className="grid grid-cols-3 gap-5">
              {dataMarketNews.map(val => (
                <Link
                  key={val.id}
                  href={`/market-news/${val.id}`}
                  className="w-full overflow-hidden pb-4 rounded flex flex-col gap-4 bg-black-section-2 cursor-pointer group hover:bg-black-neutral-383b3eff transition-colors duration-200"
                  title={val.title}
                >
                  <Image
                    src={val.imageurl}
                    alt={val.title}
                    sizes="100vw"
                    style={{
                      width: '100%',
                      maxHeight: '137px',
                      objectFit: 'cover',
                    }}
                    width={500}
                    height={300}
                  />
                  <div className="px-4 flex gap-3 flex-col">
                    <h3 className="text-sm text-primary font-normal text-left text-ellipsis line-clamp-2">
                      {val.title}
                    </h3>
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        {val.tags
                          .split('|')
                          .slice(0, 2)
                          .map(tagsVal => (
                            <span
                              key={tagsVal}
                              // eslint-disable-next-line
                              className={` bg-484848ff text-[10px] text-primary font-normal px-2 py-1 rounded-2xl whitespace-nowrap`}
                            >
                              {tagsVal}
                            </span>
                          ))}
                      </div>
                      <div className="flex gap-1 items-center">
                        <div className="flex-none fill-primary stroke-primary w-4 h-4 flex justify-center items-end">
                          <IoMdTime />
                        </div>
                        <span className="text-xs text-primary font-normal">
                          {handleFormatDate(val.published_on)}
                        </span>
                      </div>
                    </div>

                    <span className="text-primary font-normal text-[10px] self-start">
                      {val.source_info.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
