import { cookies } from 'next/headers';

import Back from '@/components/searchFaq/back';
import PrevUrl from '@/components/prevUrl';
import CryptosSend from '@/components/cryptosSend';
import formatDataCrypto from '@/services/formtaDataCrypto';
import { CryptoType, ShowUserType } from '@/components/header';
import calBalance from '@/services/calcBalance';

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

  return (
    <main className="mt-20">
      <div className="min-h-full-screen-80px bg-black-section px-20 py-14 flex flex-col gap-16">
        <section className="w-full flex flex-col gap-4">
          <div className="self-start">
            <Back />
          </div>
          <div className="self-start">
            <PrevUrl
              url1={{
                name: 'Wallet',
                url: '/wallet',
              }}
              color="text-primary"
              fill="fill-primary"
              currentPage="Select a currency"
            />
          </div>
          <h2 className="text-primary text-2xl font-normal my-2">
            Select which currency you want to send
          </h2>
          <CryptosSend
            dataCryptos={dataCryptos}
            balance={calBalance(userData.transactions)}
          />
        </section>
      </div>
    </main>
  );
}
