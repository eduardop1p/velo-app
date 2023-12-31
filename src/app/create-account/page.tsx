import { Metadata } from 'next';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const FormCreatedAccount = dynamic(
  () => import('@/components/formCreatedAccount'),
  {
    ssr: false,
  }
);

export interface CountriesType {
  name: string;
}

export const metadata: Metadata = {
  title: 'Register and start investing | Velo',
};

export default async function Page() {
  const res = await fetch(
    'https://restcountries.com/v3.1/independent?status=true&fields=name',
    {
      method: 'GET',
      next: { revalidate: 60 },
    }
  );

  const metadata = await res.json();
  const dataCountries = metadata
    .map((val: any) => ({
      name: val.name.common,
    }))
    .sort((a: { name: string }, b: { name: string }) =>
      a.name.localeCompare(b.name)
    ) as CountriesType[];

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
