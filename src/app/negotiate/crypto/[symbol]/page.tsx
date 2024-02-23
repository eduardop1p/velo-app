/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { cookies } from 'next/headers';
import { GoHome } from 'react-icons/go';

import Back from '@/components/searchFaq/back';
import { cryptosNames } from '@/services/formatDataCrypto';
import UnavailablePage from '@/components/UnavailablePage';
import { UserType } from '@/app/api/models/users';
import fetchGetUser from '@/services/fetchGetUser';
import Graphic from '@/components/negotiate/crypto/graphic';
import PrevUrl from '@/components/prevUrl';

interface Props {
  params: { symbol: string };
}

export default async function Page({ params }: Props) {
  const cryptoSymbol = params.symbol.toUpperCase();
  const cryptoName = cryptosNames.find(val => val.symbol === cryptoSymbol)?.name!; // eslint-disable-line

  const token = cookies().get('token')?.value!;

  let userData: UserType;

  try {
    userData = await fetchGetUser(token);
  } catch (err) {
    // console.log(err);
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
          currentPage={cryptoName}
        />
        <Graphic cryptoSymbol={cryptoSymbol} cryptoName={cryptoName} />
      </section>
    </main>
  );
}
