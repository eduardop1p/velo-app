import Image from 'next/image';
import Link from 'next/link';

import FormLandingPage from '@/components/formLandingPage';
import NewInVelo from '@/components/newInVelo';
import SliderCryptoassets from '@/components/sliderCryptoassets';
import { CryptoType } from '@/components/header';
import formatDataCrypto from '@/services/formtaDataCrypto';
import SliderCompleteApp from '@/components/sliderCompleteApp';

export default async function Page() {
  const resCryptoassets = await fetch(
    `${process.env.CRYPTO_API_URL}&fsyms=BTC,DOGE,XLM,LTC,ETH,ADA,SOL,DOT,AVAX,ALGO,USDC,USDT,MATIC,OP,LINK,SAND,MANA,CRV,LDO,AAVE,UNI,MKR,SNX,COMP,QNT,ATOM,APE`,
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

  return (
    <main className="mt-20">
      <section className="bg-velo-img-4 relative flex h-[490px] w-full items-center justify-between overflow-hidden bg-black bg-[length:900px_auto] bg-right-bottom bg-no-repeat px-20">
        <div className="relative z-[1] flex flex-col gap-4 max-w-lg">
          <h2 className="text-left text-4xl font-semibold text-primary">
            The easiest and safest way to invest in crypto
          </h2>
          <p className="text-base font-normal text-primary text-left">
            An easy-to-use Finnish platform for you to take advantage of the
            best opportunities in the crypto world.
          </p>
          <FormLandingPage />
        </div>
      </section>
      <section className="bg-gray-section w-full flex flex-col gap-4 px-20 py-14">
        <h2 className="text-black text-2xl">{`What's`} new at Velo</h2>
        <p className="text-gray-000000b3 text-sm font-medium">
          Here you do everything through the app and have special advantages to
          make your plans happen
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
        <SliderCryptoassets dataCryptoassets={dataCryptoassets} />
      </section>
      <section className="bg-black w-full flex justify-between items-center gap-20 px-20 py-14">
        <SliderCompleteApp />
        <div className="flex flex-col gap-8">
          <h2 className="text-primary text-2xl">
            A complete application for those who need to invest in crypto easily
            and safely
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
          <div className="flex flex-col gap-3 relative z-[2]">
            <div className="flex gap-3 items-center">
              <div className="rounded-full w-8 h-8 bg-blue flex items-center justify-center text-primary text-base">
                1
              </div>
              <div className="flex items-center gap-2">
                <span className="text-black text-base">Click</span>
                <Link
                  className="text-blue-graphic underline text-base"
                  href="/create-account"
                >
                  Open your account
                </Link>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="rounded-full w-8 h-8 bg-blue flex items-center justify-center text-primary text-base">
                2
              </div>
              <span className="text-black text-base">
                Complete the requested registration.
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <div className="rounded-full w-8 h-8 bg-blue flex items-center justify-center text-primary text-base">
                3
              </div>
              <span className="text-black text-base">
                Confirm your activation email
              </span>
            </div>
            <div className="flex gap-3 items-center">
              <div className="rounded-full w-8 h-8 bg-blue flex items-center justify-center text-primary text-base">
                4
              </div>
              <span className="text-black text-base">
                Ready! Now you can invest in crypto with ease.
              </span>
            </div>
            <div className="absolute h-[164px] bg-blue w-1 left-[14px] -z-[1]"></div>
          </div>
          <div className="flex gap-2 flex-col">
            <span className="text-sm text-black">
              Or download our app and start your registration directly there.
            </span>
            <div className="flex gap-4">
              <Image
                width={126}
                height={68}
                className="flex-none"
                src="/assets/svg/velo-svg-6.svg"
                alt="velo-svg-6"
              />
              <Image
                width={126}
                height={68}
                className="flex-none"
                src="/assets/svg/velo-svg-7.svg"
                alt="velo-svg-7"
              />
            </div>
          </div>
        </div>
        <Image
          className="flex-none"
          width={700}
          height={400}
          src="/assets/imgs/velo-img-9.png"
          alt="velo-img-9"
        />
      </section>
      <section className="bg-black w-full px-20 py-14 flex justify-between gap-20 items-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-primary text-2xl font-normal">
            Sign up for the Velo Newsletter
          </h2>
          <p className="text-primary text-base">
            A Velo platform for you to carry out your crypto operations.
          </p>
          <div className="flex gap-7">
            <div className="flex gap-2 items-center">
              <Image
                width={24}
                height={24}
                className="flex-none"
                src="/assets/svg/velo-svg-1.svg"
                alt="velo-svg-1"
              />
              <span className="text-primary text-base">All about crypto</span>
            </div>
            <div className="flex gap-2 items-center">
              <Image
                width={24}
                height={24}
                className="flex-none"
                src="/assets/svg/velo-svg-1.svg"
                alt="velo-svg-1"
              />
              <span className="text-primary text-base">
                Straight to the point
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <Image
                width={24}
                height={24}
                className="flex-none"
                src="/assets/svg/velo-svg-1.svg"
                alt="velo-svg-1"
              />
              <span className="text-primary text-base">
                Helps you stand out
              </span>
            </div>
          </div>
          <Link
            href="/newsletter"
            className="flex items-center justify-center text-base rounded h-14 w-[300px] bg-primary text-black hover:bg-blue hover:text-primary transition-colors duration-200"
          >
            I want to sign up
          </Link>
        </div>
        <Image
          className="flex-none"
          src="/assets/imgs/velo-img-2.png"
          alt="velo-img-2"
          width={500}
          height={340}
        />
      </section>
    </main>
  );
}

// border-b-2 border-black border-solid
