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
import SlideMarketOverview from '@/components/slides/marketOverview';
import FollowMarket from '@/components/followMarket';
import calcPatrimonyTotal from '@/services/calcPatrimonyTotal';
import calBalance from '@/services/calcBalance';
import calInvested from '@/services/calcInvested';
import UnavailablePage from '@/components/UnavailablePage';
import fetchGetUser from '@/services/fetchGetUser';
import fetchGetFullCryptos from '@/services/fetchGetFullCryptos';

export const metadata: Metadata = {
  title: 'Bitcoin, Ethereum and other cryptocurrencies | Velo',
  description:
    'Buying and selling bitcoin, ethereum and other cryptoactives with the credibility of OP Financial Group. Open your account.',
};

export interface UserPatrimonyInvestedType<T> {
  patrimony: T;
  invested: T;
  balance: T;
  transit?: T;
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
  const token = cookies().get('token')?.value as string;

  let userPatrimonyInvested: UserPatrimonyInvestedType<number>;
  let dataCryptos: CryptoType[];
  let dataMarketNews: MakertNewsType[];
  let newDataHistoHour = [];

  try {
    const userData: ShowUserType = await fetchGetUser(token);
    userPatrimonyInvested = {
      patrimony: calcPatrimonyTotal(
        userData.active,
        userData.veliabilities,
        calBalance(userData.transactions)
      ),
      invested: calInvested(userData.active),
      balance: calBalance(userData.transactions),
    };

    dataCryptos = await fetchGetFullCryptos();
    const hourHtc = new Date().getUTCHours();
    const limit = !hourHtc ? 1 : hourHtc;
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
    dataMarketNews = metaDataNews.Data.slice(0, 6);
  } catch {
    return <UnavailablePage />;
  }

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
  const recommendedWallet2 = dataCryptos.filter(val => {
    if (
      val.FROMSYMBOL === 'USDT' ||
      val.FROMSYMBOL === 'SOL' ||
      val.FROMSYMBOL === 'ETH' ||
      val.FROMSYMBOL === 'BTC'
    )
      return val;
  });
  const recommendedWallet3 = dataCryptos.filter(val => {
    if (
      val.FROMSYMBOL === 'USDC' ||
      val.FROMSYMBOL === 'ETH' ||
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
          <UserPatrimony userPatrimonyInvested={userPatrimonyInvested} />
          <SlideMarketOverview />
          <FollowMarket
            dataCryptos={dataCryptos}
            dataHistoHour={newDataHistoHour}
          />
          <section className="w-full flex flex-col gap-4">
            <h2 className="text-primary text-2xl font-normal">
              Crypto recommendations
            </h2>
            <div className="w-full grid grid-cols-3 gap-5">
              <Link
                className="w-full p-6 rounded flex flex-col gap-1 bg-black-section-2 cursor-pointer group hover:bg-black-neutral-383b3eff transition-colors duration-200"
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
                className="w-full p-6 rounded flex flex-col gap-1 bg-black-section-2 cursor-pointer group hover:bg-black-neutral-383b3eff transition-colors duration-200"
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
                className="w-full p-6 rounded flex flex-col gap-1 bg-black-section-2 cursor-pointer group hover:bg-black-neutral-383b3eff transition-colors duration-200"
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

              <Link
                className="w-full p-6 rounded flex flex-col gap-1 bg-black-section-2 cursor-pointer group hover:bg-black-neutral-383b3eff transition-colors duration-200"
                href="/negotiate/recommendations/wallet-2"
              >
                <div className="flex justify-between">
                  <h4 className="text-base font-normal text-primary">
                    Wallet recommendation
                  </h4>
                  <div className="bg-3d2d66ff text-primary font-normal text-xs flex items-center justify-center py-1 px-2 rounded-2xl">
                    Moderate
                  </div>
                </div>
                <p className="text-xs opacity-50 text-primary font-normal">
                  Recommended Crypto Wallet
                </p>
                <div className="flex my-3 items-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${recommendedWallet2[0].IMAGEURL}`}
                    width={35}
                    height={35}
                    alt={recommendedWallet2[0].NAME}
                    className="rounded-full !object-none"
                  />
                  <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-627eea w-[35px] h-[35px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${recommendedWallet2[1].IMAGEURL}`}
                      width={30}
                      height={30}
                      alt={recommendedWallet2[1].NAME}
                    />
                  </div>
                  <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-primary w-[35px] h-[35px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${recommendedWallet2[2].IMAGEURL}`}
                      width={30}
                      height={30}
                      alt={recommendedWallet2[2].NAME}
                    />
                  </div>
                  <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-primary w-[35px] h-[35px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${recommendedWallet2[3].IMAGEURL}`}
                      width={30}
                      height={30}
                      alt={recommendedWallet2[3].NAME}
                    />
                  </div>
                  <div className="text-primary font-medium text-sm relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-34383cff w-[35px] h-[35px]">
                    +5
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
              <Link
                className="w-full p-6 rounded flex flex-col gap-1 bg-black-section-2 cursor-pointer group hover:bg-black-neutral-383b3eff transition-colors duration-200"
                href="/negotiate/recommendations/wallet-3"
              >
                <div className="flex justify-between">
                  <h4 className="text-base font-normal text-primary">
                    Wallet recommendation
                  </h4>
                  <div className="bg-0e613aff text-primary font-normal text-xs flex items-center justify-center py-1 px-2 rounded-2xl">
                    Conservative
                  </div>
                </div>
                <p className="text-xs opacity-50 text-primary font-normal">
                  Recommended Crypto Wallet
                </p>
                <div className="flex my-3 items-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${recommendedWallet3[0].IMAGEURL}`}
                    width={35}
                    height={35}
                    alt={recommendedWallet3[0].NAME}
                    className="rounded-full !object-none"
                  />
                  <div className="relative z-[2] -ml-2 rounded-full flex items-center justify-center bg-627eea w-[35px] h-[35px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${recommendedWallet3[1].IMAGEURL}`}
                      width={30}
                      height={30}
                      alt={recommendedWallet3[1].NAME}
                    />
                  </div>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${recommendedWallet3[2].IMAGEURL}`}
                    width={35}
                    height={35}
                    alt={recommendedWallet3[2].NAME}
                    className="rounded-full !object-none relative z-[2] -ml-2"
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
            <Link
              href="/market-news"
              className="text-sm text-primary hover:underline font-normal hover:text-blue transition-colors duration-200 w-fit"
            >{`See more news >`}</Link>
          </section>
        </div>
      </main>
    </>
  );
}
