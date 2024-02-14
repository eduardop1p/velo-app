import { CryptoType } from '@/components/header';
import fetchGetFullCryptos from '@/services/fetchGetFullCryptos';
import UnavailablePage from '@/components/UnavailablePage';
import NegotiateMenu from '@/components/negotiate/menu';
import CryptoNegotiate from '@/components/negotiate/cryptosNegotiate';

export default async function Page() {
  let dataCryptos: CryptoType[];

  try {
    dataCryptos = await fetchGetFullCryptos();
  } catch (err) {
    console.log(err);
    return <UnavailablePage />;
  }

  return (
    <>
      <main className="mt-20">
        <section className="bg-black-section min-h-full-screen-80px px-20 py-10 flex flex-col gap-3 w-full">
          <h2 className="text-primary font-normal text-2xl">Negotiate</h2>
          <p className="text-primary font-normal text-base">
            Choose the currency you want to trade
          </p>
          <NegotiateMenu />
          <CryptoNegotiate dataCryptos={dataCryptos} />
        </section>
      </main>
    </>
  );
}
