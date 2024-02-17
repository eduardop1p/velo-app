import { Metadata } from 'next';
import { cookies } from 'next/headers';
// import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { IoMdTime } from 'react-icons/io';
import { DateTime } from 'luxon';

import UserPatrimony from '@/components/userPatrimony';
import { CryptoType } from '@/components/header';
import SlideMarketOverview from '@/components/slides/marketOverview';
import FollowMarket from '@/components/followMarket';
import calcPatrimonyTotal from '@/services/calcPatrimonyTotal';
import calBalance from '@/services/calcBalance';
import calInvested from '@/services/calcInvested';
import UnavailablePage from '@/components/UnavailablePage';
import fetchGetUser from '@/services/fetchGetUser';
import fetchGetFullCryptos from '@/services/fetchGetFullCryptos';
import { ActiveType, UserType } from '../api/models/users';
import NegotiateRecommendations from '@/components/negotiate/recommendations';

export const metadata: Metadata = {
  title: 'Bitcoin, Ethereum and other cryptocurrencies | Velo',
  description:
    'Buying and selling bitcoin, ethereum and other cryptoactives with the credibility of OP Financial Group. Open your account.',
};

export interface UserPatrimonyInvestedType<T> {
  patrimony: T;
  invested: {
    value: T;
    active: ActiveType[];
  };
  balance: T;
  transit?: T;
}

export interface HistorHourType {
  time: number | string;
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
    const userData: UserType = await fetchGetUser(token);
    userPatrimonyInvested = {
      patrimony: calcPatrimonyTotal(
        userData.active,
        userData.veliabilities,
        calBalance(userData.transactions)
      ),
      invested: {
        value: calInvested(userData.active),
        active: userData.active,
      },
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
      const dataHistoHour = metaDataHistoHour.Data.Data?.map(
        ({ time, close, open }: HistorHourType) => ({
          time: +time * 1000,
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
    dataMarketNews = metaDataNews.Data?.slice(0, 6);
  } catch (err) {
    console.log(err);
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
  const layer2DeFiCryptos = dataCryptos.filter(val => {
    if (
      val.FROMSYMBOL === 'LDO' ||
      val.FROMSYMBOL === 'SNX' ||
      val.FROMSYMBOL === 'MKR' ||
      val.FROMSYMBOL === 'UNI' ||
      val.FROMSYMBOL === 'AAVE'
    )
      return val;
  });
  const layer3Cryptos = dataCryptos.filter(val => {
    if (
      val.FROMSYMBOL === 'SOL' ||
      val.FROMSYMBOL === 'OP' ||
      val.FROMSYMBOL === 'UNI' ||
      val.FROMSYMBOL === 'BTC'
    )
      return val;
  });
  const layer4Cryptos = dataCryptos.filter(val => {
    if (
      val.FROMSYMBOL === 'ARB' ||
      val.FROMSYMBOL === 'SOL' ||
      val.FROMSYMBOL === 'ETH' ||
      val.FROMSYMBOL === 'BTC'
    )
      return val;
  });
  const layer5Cryptos = dataCryptos.filter(val => {
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
          <NegotiateRecommendations
            layer2DeFiCryptos={layer2DeFiCryptos}
            layer1Cryptos={layer1Cryptos}
            layer3Cryptos={layer3Cryptos}
            layer4Cryptos={layer4Cryptos}
            layer5Cryptos={layer5Cryptos}
            showTitle
          />
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
