import { Metadata } from 'next';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import UnavailablePage from '@/components/UnavailablePage';
import SkeletonUi from '@/components/skeletonUI';
const FormCreatedAccount = dynamic(
  () => import('@/components/forms/createdAccount'),
  {
    ssr: false,
    loading: () => <SkeletonFormCreatedAccount />,
  }
);

export interface CountriesType {
  name: string;
}

export const metadata: Metadata = {
  title: 'Register and start investing | Velo',
};

export default async function Page() {
  let dataCountries: CountriesType[];

  try {
    const res = await fetch(
      'https://restcountries.com/v3.1/independent?status=true&fields=name',
      {
        method: 'GET',
        next: { revalidate: 60 },
      }
    );

    const metadata = await res.json();
    dataCountries = metadata
      .map((val: any) => ({
        name: val.name.common,
      }))
      .sort((a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name)
      );
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
{
  /* <SkeletonUi bgColor="#DDDBDD" /> */
}
const SkeletonFormCreatedAccount = () => {
  return (
    <div className="flex flex-col gap-5 w-3/5">
      <SkeletonUi bgColor="#DDDBDD" width="40%" height={36} />
      <SkeletonUi bgColor="#DDDBDD" width="50%" height={28} />
      <div className="flex flex-col w-full gap-8">
        <div className="flex items-center w-full gap-4">
          <div className="flex flex-col gap-2 w-1/2">
            <SkeletonUi bgColor="#DDDBDD" width="30%" height={22} />
            <SkeletonUi bgColor="#DDDBDD" width="100%" height={48} />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <SkeletonUi bgColor="#DDDBDD" width="30%" height={22} />
            <SkeletonUi bgColor="#DDDBDD" width="100%" height={48} />
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-2 w-full">
            <SkeletonUi bgColor="#DDDBDD" width="10%" height={22} />
            <SkeletonUi bgColor="#DDDBDD" width="100%" height={48} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center w-full gap-4">
            <div className="flex flex-col gap-2 w-1/2">
              <SkeletonUi bgColor="#DDDBDD" width="30%" height={22} />
              <SkeletonUi bgColor="#DDDBDD" width="100%" height={48} />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <SkeletonUi bgColor="#DDDBDD" width="40%" height={22} />
              <SkeletonUi bgColor="#DDDBDD" width="100%" height={48} />
            </div>
          </div>
          <SkeletonUi bgColor="#DDDBDD" width="50%" height={117} />
        </div>
        <div className="w-full flex flex-col gap-2">
          <SkeletonUi bgColor="#DDDBDD" width="50%" height={20} />
          <SkeletonUi bgColor="#DDDBDD" width="100%" height={48} />
        </div>
      </div>
    </div>
  );
};
