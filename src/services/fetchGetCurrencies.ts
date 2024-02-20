export interface CurrenciesType {
  name: string;
  code: string;
  symbol: string;
  colors: { bg: string; text: string };
}

export default async function fetchGetCurrencies(): Promise<CurrenciesType[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_COUNTRIES_CURRENCIES}`,
    {
      method: 'GET',
      next: { revalidate: 60 },
    }
  );

  const colors = [
    {
      bg: '#307967', // dzd
      text: '#fff',
    },
    {
      bg: '#eceff2', // ars
      text: '#39adf6',
    },
    {
      bg: '#010186', // aud
      text: '#fff',
    },
    {
      bg: '#307967', // bdt
      text: '#fff',
    },
    {
      bg: '#019538', // brl
      text: '#efd601',
    },
    {
      bg: '#1a539f', // gbp
      text: '#fff',
    },
    {
      bg: '#eceff2', // bgn
      text: '#307967',
    },
    {
      bg: '#eceff2', // cad
      text: '#d7341c',
    },
    {
      bg: '#f2d24b', // cop
      text: '#4b7fe2',
    },
    {
      bg: '#0137a3', // czk
      text: '#fff',
    },
    {
      bg: '#f22542', // dkk
      text: '#fff',
    },
    {
      bg: '#000', // egp
      text: '#fff',
    },
    {
      bg: '#023194', // eur
      text: '#f3c402',
    },
    {
      bg: '#f2d24b', // ghs
      text: '#000',
    },
    {
      bg: '#f22542', // hkd
      text: '#fff',
    },
    {
      bg: '#f69431', // inr
      text: '#fff',
    },
    {
      bg: '#f22542', // idr
      text: '#fff',
    },
    {
      bg: '#eceff2', // ils
      text: '#225dd5',
    },
    {
      bg: '#eceff2', // jpy
      text: '#f22c47',
    },
    {
      bg: '#000', // jod
      text: '#fff',
    },
    {
      bg: '#39adf6', // kzt
      text: '#effd62',
    },
    {
      bg: '#f22542', // kes
      text: '#fff',
    },
    {
      bg: '#000', // kwd
      text: '#fff',
    },
    {
      bg: '#0137a3', // lak
      text: '#fff',
    },
    {
      bg: '#eceff2', // myr
      text: '#215cd5',
    },
    {
      bg: '#307967', // mxn
      text: '#fff',
    },
    {
      bg: '#f22542', // mad
      text: '#fff',
    },
    {
      bg: '#f22542', // npr
      text: '#fff',
    },
    {
      bg: '#0137a3', // twd
      text: '#fb5068',
    },
    {
      bg: '#072672', // nzd
      text: '#ea4661',
    },
    {
      bg: '#00834d', // ngn
      text: '#fff',
    },
    {
      bg: '#072672', // nok
      text: '#fff',
    },
    {
      bg: '#307967', // pkr
      text: '#fff',
    },
    {
      bg: '#0137a3', // php
      text: '#fff',
    },
    {
      bg: '#eceff2', // pln
      text: '#f22744',
    },
    {
      bg: '#f2d24b', // ron
      text: '#fff',
    },
    {
      bg: '#0137a3', // rub
      text: '#fff',
    },
    {
      bg: '#006933', // sar
      text: '#fff',
    },
    {
      bg: '#eceff2', // sgb
      text: '#f64545',
    },
    {
      bg: '#1a7346', // zar
      text: '#fff',
    },
    {
      bg: '#010186', // krw
      text: '#fff',
    },
    {
      bg: '#0137a3', // sek
      text: '#f2d24b',
    },
    {
      bg: '#f22542', // chf
      text: '#fff',
    },
    {
      bg: '#019538', // tzs
      text: '#39adf6',
    },
    {
      bg: '#072672', // thd
      text: '#fff',
    },
    {
      bg: '#f22542', // try
      text: '#fff',
    },
    {
      bg: '#0137a3', // uah
      text: '#f2d24b',
    },
    {
      bg: '#ff0000', // aed
      text: '#fff',
    },
    {
      bg: '#eceff2', // usd
      text: '#d73921',
    },
    {
      bg: '#f22542', // ves
      text: '#f2d24b',
    },
    {
      bg: '#ca4e49', // vnd
      text: '#f2d24b',
    },
  ];

  const metadata = await res.json();
  const dataCurrencies = metadata
    .map((val: any) => ({
      name: val.currencies[Object.keys(val.currencies)[0]].name,
      code: Object.keys(val.currencies)[0].toUpperCase(),
      symbol: val.currencies[Object.keys(val.currencies)[0]].symbol,
    }))
    .sort((a: { name: string }, b: { name: string }) =>
      a.name.localeCompare(b.name)
    )
    .map((val: CurrenciesType, i: number) => ({ ...val, colors: colors[i] }));

  return dataCurrencies;
}
