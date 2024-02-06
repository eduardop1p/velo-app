import { cookies } from 'next/headers';

import Back from '@/components/searchFaq/back';
import PrevUrl from '@/components/prevUrl';
import WalletSend from '@/components/walletSend';
import calBalance from '@/services/calcBalance';
import fetchGetUser from '@/services/fetchGetUser';
import fetchGetFullCryptos from '@/services/fetchGetFullCryptos';
import UnavailablePage from '@/components/UnavailablePage';
import { CryptoType, ShowUserType } from '@/components/header';
import fetchGetCountries from '@/services/fetchGetCountries';
import { CountriesType } from '@/app/create-account/page';

export default async function Page() {
  const token = cookies().get('token')?.value as string;

  let userData: ShowUserType;
  let dataCryptos: CryptoType[];
  let dataCountries: CountriesType[];

  try {
    userData = await fetchGetUser(token);
    dataCountries = await fetchGetCountries();
    dataCryptos = await fetchGetFullCryptos();
  } catch {
    return <UnavailablePage />;
  }

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
          <WalletSend
            dataCryptos={dataCryptos}
            balance={calBalance(userData.transactions)}
            dataCountries={dataCountries}
          />
        </section>
      </div>
    </main>
  );
}
