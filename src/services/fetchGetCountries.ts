import { CountriesType } from '@/app/create-account/page';

export default async function fetchGetCountries(): Promise<CountriesType[]> {
  const res = await fetch(
    'https://restcountries.com/v3.1/independent?status=true&fields=name',
    {
      method: 'GET',
      next: { revalidate: 60 },
    }
  );

  const metadata = await res.json();
  const dataCountries: CountriesType[] = metadata
    .map((val: any) => ({
      name: val.name.common,
    }))
    .sort((a: { name: string }, b: { name: string }) =>
      a.name.localeCompare(b.name)
    );

  return dataCountries;
}
