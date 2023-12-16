import FormLandingPage from '@/components/formLandingPage';
import NewInVelo from '@/components/newInVelo';
import SliderCryptoassets from '@/components/sliderCryptoassets';
import { CryptoType } from '@/components/header';
import formatDataCrypto from '@/services/formtaDataCrypto';

export default async function Page() {
  const resCryptoassets = await fetch(
    `${process.env.CRYPTO_API_URL}&fsyms=BTC,DOGE,XLM,LTC,ETH,ADA,SOL,DOT,AVAX,ALGO,USDC,USDT,MATIC,OP,LINK,SAND,MANA,CRV,LDO,AAVE,UNI,MKR,SNX,COMP,QNT,ATOM,APE`,
    {
      method: 'GET',
      next: {
        revalidate: 10,
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
        <div className="relative z-[1] flex flex-col gap-3 max-w-lg">
          <h2 className="text-left text-2xl font-normal text-primary">
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
        <h2 className="text-black text-2xl">Cryptoassets</h2>
        <p className="text-gray-000000b3 text-sm font-medium">
          Check out the products available at Velo and their current prices:
        </p>
        <SliderCryptoassets dataCryptoassets={dataCryptoassets} />
      </section>
    </main>
  );
}

// border-b-2 border-black border-solid
