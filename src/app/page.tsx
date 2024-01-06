import Image from 'next/image';

import FormLandingPage from '@/components/formLandingPage';
import NewInVelo from '@/components/newInVelo';
import SliderCryptoassets from '@/components/sliderCryptoassets';
import { CryptoType } from '@/components/header';
import formatDataCrypto from '@/services/formtaDataCrypto';
import SliderCompleteApp from '@/components/sliderCompleteApp';
import TimeLineApp from '@/components/TimeLineApp';
import SectionNewsletter from '@/components/sectionNewsletter';
import Footer from '@/components/footer';
import { HistorHourType } from './home/page';

export default async function Page() {
  const resCryptoassets = await fetch(
    `${process.env.CRYPTO_API_URL}&fsyms=BTC,DOGE,XLM,XRP,LTC,ETH,ADA,SOL,DOT,AVAX,ALGO,USDC,USDT,MATIC,OP,LINK,SAND,MANA,CRV,LDO,AAVE,UNI,MKR,SNX,COMP,QNT,ATOM,APE`,
    {
      method: 'GET',
      next: {
        revalidate: 60,
      },
    }
  );
  const metaData = await resCryptoassets.json();
  const dataCryptoassets = formatDataCrypto(
    'full-data',
    metaData.RAW
  ) as CryptoType[];

  const hourHtc = new Date().getUTCHours();
  const limit = !hourHtc ? 60 : hourHtc * 60;
  const newDataHistoHour = [];
  for (let i = 0; i < dataCryptoassets.length; i++) {
    const resHistoHour = await fetch(
      `${process.env.NEXT_PUBLIC_CRYPTO_API_URL_HISTOMINUTE}&fsym=${dataCryptoassets[i].FROMSYMBOL}&limit=${limit}`,
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
        FROMSYMBOL: dataCryptoassets[i].FROMSYMBOL,
      })
    ) as HistorHourType[];
    newDataHistoHour.push(dataHistoHour);
  }

  return (
    <>
      <main className="mt-20">
        <section className="bg-velo-img-4 relative flex h-[490px] w-full items-center justify-between overflow-hidden bg-black bg-[length:900px_auto] bg-right-bottom bg-no-repeat px-20">
          <div className="relative z-[1] flex flex-col gap-4 max-w-lg">
            <h2 className="text-left text-4xl font-semibold text-primary">
              The easiest and safest way to invest in crypto
            </h2>
            <p className="text-base font-normal text-primary text-left">
              An easy-to-use Finland platform for you to take advantage of the
              best opportunities in the crypto world.
            </p>
            <FormLandingPage />
          </div>
        </section>
        <section className="bg-gray-section w-full flex flex-col gap-4 px-20 py-14">
          <h2 className="text-black text-2xl">{`What's`} new at Velo</h2>
          <p className="text-gray-000000b3 text-sm font-medium">
            Here you do everything through the app and have special advantages
            to make your plans happen
          </p>
          <div className="grid grid-cols-4 gap-5">
            <NewInVelo
              title="Velo app"
              description="Discover the Velo app and all its features."
              btnText="Get to know"
              url="/create-account"
            />
            <NewInVelo
              title="Fan pass $VPS"
              description="Discover Vaasan Palloseura's currency that allows you to purchase exclusive experiences, available on the team's platform."
              btnText="Get to know"
              url="/create-account"
            />
            <NewInVelo
              title="Newsletters Velo"
              description="Do like thousands of people who are learning about crypto in a simple way."
              btnText="Check out"
              url="/newsletters"
            />
            <NewInVelo
              title="Bitcoin Experts Course"
              description="About cryptoassets and everything you need to know about the money of the future."
              btnText="Sign up for free"
              url="/bitcoin-experts-course"
            />
          </div>
        </section>
        <section className="bg-primary w-full flex flex-col gap-4 px-20 py-14">
          <h2 className="text-black text-2xl font-semibold">Cryptoassets</h2>
          <p className="text-gray-000000b3 text-sm font-medium">
            Check out the products available at Velo and their current prices:
          </p>
          <SliderCryptoassets
            dataCryptoassets={dataCryptoassets}
            dataHistoHour={newDataHistoHour}
          />
        </section>
        <section className="bg-black w-full flex justify-between items-center gap-20 px-20 py-14">
          <SliderCompleteApp />
          <div className="flex flex-col gap-8">
            <h2 className="text-primary text-2xl">
              A complete application for those who need to invest in crypto
              easily and safely
            </h2>
            <h2 className="text-primary text-2xl font-normal">Why use Velo?</h2>
            <div className="flex gap-20">
              <div className="flex flex-col gap-5">
                <div className="flex gap-4 items-center">
                  <Image
                    src="/assets/svg/velo-svg-5.svg"
                    alt="velo-svg-5"
                    width={48}
                    height={48}
                    className="flex-none"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-primary text-base font-medium">
                      Easy access
                    </span>
                    <span className="text-primary text-xs font-normal">
                      Intuitive platform for you to invest.
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <Image
                    src="/assets/svg/velo-svg-3.svg"
                    alt="velo-svg-3"
                    width={48}
                    height={48}
                    className="flex-none"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-primary text-base font-medium">
                      Security
                    </span>
                    <span className="text-primary text-xs font-normal">
                      The solidity of a velo company.
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex gap-4 items-center">
                  <Image
                    src="/assets/svg/velo-svg-4.svg"
                    alt="velo-svg-4"
                    width={48}
                    height={48}
                    className="flex-none"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-primary text-base font-medium">
                      Didactic
                    </span>
                    <span className="text-primary text-xs font-normal">
                      Track your results in easy-to-interpret graph4
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <Image
                    src="/assets/svg/velo-svg-2.svg"
                    alt="velo-svg-2"
                    width={48}
                    height={48}
                    className="flex-none"
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-primary text-base font-medium">
                      Multiplataformas
                    </span>
                    <span className="text-primary text-xs font-normal">
                      Buy assets via the Mynt app or computer.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-gray-section-2 w-full px-20 py-14 flex justify-between gap-20 items-center">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-black font-semibold text-2xl text-left">
                How to become a Velo customer
              </h2>
              <p className="text-black font-normal text-xl text-left">
                and start investing in cryptos?
              </p>
              <p className="text-black font-normal text-sm text-left">
                You can register on our website or directly in the app.
              </p>
            </div>
            <TimeLineApp />
          </div>
          <Image
            className="flex-none"
            width={700}
            height={400}
            src="/assets/imgs/velo-img-9.png"
            alt="velo-img-9"
          />
        </section>
        <SectionNewsletter />
      </main>
      <Footer footerAddress />
    </>
  );
}

// border-b-2 border-black border-solid
