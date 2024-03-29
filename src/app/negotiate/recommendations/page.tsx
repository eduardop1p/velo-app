import UnavailablePage from '@/components/UnavailablePage';
import { CryptoType } from '@/components/header';
import NegotiateMenu from '@/components/negotiate/menu';
import NegotiateRecommendations from '@/components/negotiate/recommendations';
import fetchGetFullCryptos from '@/services/fetchGetFullCryptos';

export default async function Page() {
  let dataCryptos: CryptoType[];

  try {
    dataCryptos = await fetchGetFullCryptos();
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

  return (
    <>
      <main className="mt-20">
        <section className="bg-black-section min-h-full-screen-80px px-20 py-10 flex flex-col gap-3 w-full">
          <h2 className="text-primary font-normal text-2xl">Negotiate</h2>
          <p className="text-primary font-normal text-base">
            Choose the currency you want to trade
          </p>
          <NegotiateMenu />
          <div className="mt-5">
            <NegotiateRecommendations
              layer2DeFiCryptos={layer2DeFiCryptos}
              layer1Cryptos={layer1Cryptos}
              layer3Cryptos={layer3Cryptos}
              layer4Cryptos={layer4Cryptos}
              layer5Cryptos={layer5Cryptos}
              showTitle={false}
            />
          </div>
        </section>
      </main>
    </>
  );
}
