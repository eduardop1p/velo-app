import SlideInvestInCryptos from '@/components/sliderInvestCryptos';
import { CryptoType } from '@/components/header';

export default function InvestOtherCryptos({
  dataCryptoassets,
}: {
  dataCryptoassets: CryptoType[];
}) {
  return (
    <section className="bg-primary px-20 py-14 w-full">
      <h2 className="text-black text-2xl font-normal">
        Invest in other cryptos with Velo!
      </h2>
      <div className="mt-10 w-full">
        <SlideInvestInCryptos dataCryptoassets={dataCryptoassets} />
      </div>
    </section>
  );
}
