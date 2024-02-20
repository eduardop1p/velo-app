import { Metadata } from 'next';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import UnavailablePage from '@/components/UnavailablePage';
import SkeletonFormCreatedAccount from '@/components/forms/createdAccount/skeletonFormCreatedAccount';
import fetchGetCountries from '@/services/fetchGetCountries';
const FormCreatedAccount = dynamic(
  () => import('@/components/forms/createdAccount'),
  {
    ssr: false,
    loading: () => <SkeletonFormCreatedAccount />,
  }
);

export interface CountriesType {
  name: string;
  currency: {
    code: string;
    name: string;
    symbol: string;
  };
}

export const metadata: Metadata = {
  title: 'Register and start investing | Velo',
};

export default async function Page() {
  let dataCountries: CountriesType[];

  try {
    dataCountries = await fetchGetCountries();
  } catch {
    return <UnavailablePage />;
  }

  return (
    <main className="mt-20">
      <section className="flex px-20 py-8 justify-between gap-20 items-center">
        <Image
          src="/assets/imgs/velo-img-15.png"
          width={322}
          height={622}
          alt="velo-img-15"
        />
        <FormCreatedAccount dataCountries={dataCountries} />
      </section>
    </main>
  );
}
