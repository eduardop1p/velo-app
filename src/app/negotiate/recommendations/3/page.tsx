import Image from 'next/image';
import { cookies } from 'next/headers';
import { GoHome } from 'react-icons/go';

import PrevUrl from '@/components/prevUrl';
import Back from '@/components/searchFaq/back';
import formatPrice from '@/services/formatPrice';
import UnavailablePage from '@/components/UnavailablePage';
import { UserType } from '@/app/api/models/users';
import fetchGetUser from '@/services/fetchGetUser';
import calBalance from '@/services/calcBalance';
import calTransit from '@/services/calcTransit';
import { CryptoType } from '@/components/header';
import formatDataCrypto from '@/services/formatDataCrypto';
import formatLastComma from '@/services/formatLastComma';
import { WalletRecommendation3Images } from '@/components/negotiate/recommendations';

export default async function Page() {
  const token = cookies().get('token')?.value as string;

  let userData: UserType;
  let dataCryptos: CryptoType[];

  try {
    userData = await fetchGetUser(token);
    const resCryptos = await fetch(
      `${process.env.CRYPTO_API_URL}&fsyms=BTC,SOL,OP,UNI,MATIC,ARB,SNX,LDO,ETH,AVAX`,
      {
        method: 'GET',
        next: {
          revalidate: 60,
        },
      }
    );
    const metaData = await resCryptos.json();
    dataCryptos = formatDataCrypto('layer-3', metaData.RAW);
  } catch (err) {
    console.log(err);
    return <UnavailablePage />;
  }

  return (
    <main className="mt-20">
      <section className="bg-black-section min-h-full-screen-80px px-20 py-10 flex flex-col gap-5 w-full">
        <Back />
        <PrevUrl
          firstIcon={<GoHome />}
          url1={{
            name: 'Home',
            url: '/',
          }}
          url2={{
            name: 'Negotiate',
            url: '/negotiate',
          }}
          color="text-primary"
          fill="fill-primary"
          currentPage="Recommendation"
        />
        <div className="flex gap-6">
          <div className="mt-5 flex flex-col gap-5 w-[65%]">
            <div className="flex gap-4 items-center">
              <h2 className="text-primary font-normal text-2xl">
                Wallet recommendation
              </h2>
              <span className="bg-123570ff text-primary font-normal text-xs px-3 py-[6px] rounded-2xl">
                Sophisticated
              </span>
            </div>
            <div className="flex flex-col gap-[2px]">
              <div className="flex justify-between">
                <div className="flex flex-col gap-[2px]">
                  <h2 className="text-primary font-normal opacity-70 text-[15px]">
                    Minimum investment
                  </h2>
                  <span className="text-primary font-normal text-base">
                    {formatPrice(820)}
                  </span>
                </div>
                <button className="text-primary font-normal text-sm bg-bluehover w-[90px] h-10 flex justify-center items-center rounded cursor-pointer hover:bg-blue transition-colors duration-200">
                  Buy
                </button>
              </div>
              <div className="flex gap-2">
                <span className="text-primary font-normal opacity-70 text-[15px]">
                  Account balance:
                </span>
                <span className="text-primary font-normal opacity-70 text-[15px]">
                  {formatPrice(calBalance(userData.transactions))}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary font-normal opacity-70 text-[15px]">
                  Balance in transit:
                </span>
                <span className="text-primary font-normal opacity-70 text-[15px]">
                  {formatPrice(calTransit(userData.transactions))}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-primary font-normal text-base">
                Description
              </h3>
              <p className="text-sm font-normal text-primary opacity-70">
                Aimed at more daring investors, Velo Sophisticated Portfolio
                combines stability with the search for innovation. It delves
                into the latest and most revolutionary developments in the
                crypto ecosystem, aiming for potential high returns. It is
                recommended for investors with in-depth knowledge of the digital
                asset market, who seek to maximize appreciation potential, while
                being aware and comfortable with the greater volatility inherent
                to this approach.
              </p>
            </div>
            <div className="flex flex-col">
              <WalletRecommendation3Images layer3Cryptos={dataCryptos} />
              <span className="text-[15px] font-normal text-primary opacity-70">
                {formatLastComma(dataCryptos.map(val => val.NAME).join(', '))}
              </span>
            </div>
          </div>
          <div className="w-[35%] h-fit bg-1b1e20ff p-6 rounded-lg flex-none flex flex-col">
            <h3 className="mb-4 text-primary font-normal text-base">
              Allocation
            </h3>
            <div className="mb-5 flex items-center justify-between">
              <span className="text-primary font-normal text-[15px] opacity-70">
                Cryptocurrencies
              </span>
              <span className="text-primary font-normal text-[15px] opacity-70">
                Allocation
              </span>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex justify-between gap-2 items-center">
                <div className="flex items-start gap-2">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${dataCryptos[0].IMAGEURL}`}
                    width={36}
                    height={36}
                    alt={dataCryptos[0].NAME}
                    className="rounded-full !object-none"
                  />
                  <div className="flex flex-col">
                    <span className="text-primary font-normal text-sm">
                      {dataCryptos[0].FROMSYMBOL}
                    </span>
                    <span className="text-primary font-normal text-xs opacity-70">
                      {dataCryptos[0].NAME}
                    </span>
                  </div>
                </div>
                <span className="text-[15px] font-normal text-primary">
                  25%
                </span>
              </div>

              <div className="flex justify-between gap-2 items-center">
                <div className="flex items-start gap-2">
                  <div className="relative z-[2] rounded-full flex items-center justify-center bg-primary w-[36px] h-[36px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${dataCryptos[1].IMAGEURL}`}
                      width={31}
                      height={31}
                      alt={dataCryptos[1].NAME}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-primary font-normal text-sm">
                      {dataCryptos[1].FROMSYMBOL}
                    </span>
                    <span className="text-primary font-normal text-xs opacity-70">
                      {dataCryptos[1].NAME}
                    </span>
                  </div>
                </div>
                <span className="text-[15px] font-normal text-primary">
                  10%
                </span>
              </div>

              <div className="flex justify-between gap-2 items-center">
                <div className="flex items-start gap-2">
                  <div className="relative z-[2] rounded-full flex items-center justify-center bg-ff0420 w-[36px] h-[36px]">
                    <span className="text-primary text-[13px] italic font-semibold">
                      OP
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-primary font-normal text-sm">
                      {dataCryptos[2].FROMSYMBOL}
                    </span>
                    <span className="text-primary font-normal text-xs opacity-70">
                      {dataCryptos[2].NAME}
                    </span>
                  </div>
                </div>
                <span className="text-[15px] font-normal text-primary">
                  7.5%
                </span>
              </div>

              <div className="flex justify-between gap-2 items-center">
                <div className="flex items-start gap-2">
                  <div className="relative z-[2] rounded-full flex items-center justify-center bg-primary w-[36px] h-[36px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${dataCryptos[3].IMAGEURL}`}
                      width={31}
                      height={31}
                      alt={dataCryptos[3].NAME}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-primary font-normal text-sm">
                      {dataCryptos[3].FROMSYMBOL}
                    </span>
                    <span className="text-primary font-normal text-xs opacity-70">
                      {dataCryptos[3].NAME}
                    </span>
                  </div>
                </div>
                <span className="text-[15px] font-normal text-primary">
                  2.5%
                </span>
              </div>

              <div className="flex justify-between gap-2 items-center">
                <div className="flex items-start gap-2">
                  <div className="relative z-[2] rounded-full flex items-center justify-center bg-primary w-[36px] h-[36px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${dataCryptos[4].IMAGEURL}`}
                      width={31}
                      height={31}
                      alt={dataCryptos[4].NAME}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-primary font-normal text-sm">
                      {dataCryptos[4].FROMSYMBOL}
                    </span>
                    <span className="text-primary font-normal text-xs opacity-70">
                      {dataCryptos[4].NAME}
                    </span>
                  </div>
                </div>
                <span className="text-[15px] font-normal text-primary">5%</span>
              </div>

              <div className="flex justify-between gap-2 items-center">
                <div className="flex items-start gap-2">
                  <div className="relative z-[2] rounded-full flex items-center justify-center bg-9dcced w-[36px] h-[36px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${dataCryptos[5].IMAGEURL}`}
                      width={31}
                      height={31}
                      alt={dataCryptos[5].NAME}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-primary font-normal text-sm">
                      {dataCryptos[5].FROMSYMBOL}
                    </span>
                    <span className="text-primary font-normal text-xs opacity-70">
                      {dataCryptos[5].NAME}
                    </span>
                  </div>
                </div>
                <span className="text-[15px] font-normal text-primary">
                  7.5%
                </span>
              </div>

              <div className="flex justify-between gap-2 items-center">
                <div className="flex items-start gap-2">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${dataCryptos[6].IMAGEURL}`}
                    width={36}
                    height={36}
                    alt={dataCryptos[6].NAME}
                    className="relative z-[2] rounded-full !object-none"
                  />
                  <div className="flex flex-col">
                    <span className="text-primary font-normal text-sm">
                      {dataCryptos[6].FROMSYMBOL}
                    </span>
                    <span className="text-primary font-normal text-xs opacity-70">
                      {dataCryptos[6].NAME}
                    </span>
                  </div>
                </div>
                <span className="text-[15px] font-normal text-primary">
                  2.5%
                </span>
              </div>

              <div className="flex justify-between gap-2 items-center">
                <div className="flex items-start gap-2">
                  <div className="relative rounded-full flex items-center justify-center bg-primary w-[36px] h-[36px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${dataCryptos[7].IMAGEURL}`}
                      width={31}
                      height={31}
                      alt={dataCryptos[7].NAME}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-primary font-normal text-sm">
                      {dataCryptos[7].FROMSYMBOL}
                    </span>
                    <span className="text-primary font-normal text-xs opacity-70">
                      {dataCryptos[7].NAME}
                    </span>
                  </div>
                </div>
                <span className="text-[15px] font-normal text-primary">
                  7.5%
                </span>
              </div>

              <div className="flex justify-between gap-2 items-center">
                <div className="flex items-start gap-2">
                  <div className="relative rounded-full flex items-center justify-center bg-627eea w-[36px] h-[36px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${dataCryptos[8].IMAGEURL}`}
                      width={31}
                      height={31}
                      alt={dataCryptos[8].NAME}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-primary font-normal text-sm">
                      {dataCryptos[8].FROMSYMBOL}
                    </span>
                    <span className="text-primary font-normal text-xs opacity-70">
                      {dataCryptos[8].NAME}
                    </span>
                  </div>
                </div>
                <span className="text-[15px] font-normal text-primary">
                  27.5%
                </span>
              </div>

              <div className="flex justify-between gap-2 items-center">
                <div className="flex items-start gap-2">
                  <div className="relative z-[2] rounded-full flex items-center justify-center bg-ed3e43 w-[36px] h-[36px]">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL_IMAGE}/${dataCryptos[9].IMAGEURL}`}
                      width={31}
                      height={31}
                      alt={dataCryptos[9].NAME}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-primary font-normal text-sm">
                      {dataCryptos[9].FROMSYMBOL}
                    </span>
                    <span className="text-primary font-normal text-xs opacity-70">
                      {dataCryptos[9].NAME}
                    </span>
                  </div>
                </div>
                <span className="text-[15px] font-normal text-primary">5%</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
