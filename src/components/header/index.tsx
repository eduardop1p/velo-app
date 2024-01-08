import { cookies } from 'next/headers';

import formatDataCrypto from '@/services/formtaDataCrypto';
import { ActiveCryptoType } from '../products';
import Headers from './headers';
import {
  ActiveVeliabilitiesType,
  TransactionsType,
} from '@/app/api/models/users';

export interface CryptoType {
  NAME: string;
  DESCRIPTION: string;
  FROMSYMBOL: string;
  MEDIAN: number;
  PRICE: number;
  LASTUPDATE: number;
  LASTVOLUME: number;
  LASTVOLUMETO: number;
  VOLUMEHOUR: number;
  VOLUMEHOURTO: number;
  OPENHOUR: number;
  HIGHHOUR: number;
  LOWHOUR: number;
  VOLUMEDAY: number;
  VOLUMEDAYTO: number;
  OPENDAY: number;
  HIGHDAY: number;
  LOWDAY: number;
  CHANGEDAY: number;
  CHANGEPCTDAY: number;
  CHANGEHOUR: number;
  CHANGEPCTHOUR: number;
  IMAGEURL: string;
}

export interface ShowUserType {
  name: string;
  email: string;
  dateBirth: string;
  cellPhone: string;
  country: string;
  invested: number;
  traffic: number;
  active: ActiveVeliabilitiesType[];
  veliabilities: ActiveVeliabilitiesType[];
  transactions: TransactionsType[];
}

const getData = async (url: string, activeCrypto: ActiveCryptoType) => {
  const res = await fetch(url, {
    method: 'GET',
    next: { revalidate: 60 },
  });
  const metaData = await res.json();
  return formatDataCrypto(activeCrypto, metaData.RAW);
};

export default async function Header() {
  const cookie = cookies();
  const isAuth = cookie.has('token');
  let userData: ShowUserType | undefined;
  if (isAuth) {
    const token = cookie.get('token')?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/show-user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });
    userData = await res.json();
  }

  const dataCurrencies = (await getData(
    `${process.env.CRYPTO_API_URL}&fsyms=BTC,DOGE,XLM,LTC`,
    'currencies'
  )) as CryptoType[];
  const dataSmartContract = (await getData(
    `${process.env.CRYPTO_API_URL}&fsyms=ETH,ADA,SOL,DOT,AVAX,ALGO`,
    'smart-contract'
  )) as CryptoType[];
  const dataStablecoin = (await getData(
    `${process.env.CRYPTO_API_URL}&fsyms=USDC,USDT`,
    'stablecoin'
  )) as CryptoType[];
  const dataScalling = (await getData(
    `${process.env.CRYPTO_API_URL}&fsyms=MATIC,OP`,
    'scalling'
  )) as CryptoType[];
  const dataOracle = (await getData(
    `${process.env.CRYPTO_API_URL}&fsyms=LINK`,
    'oracle'
  )) as CryptoType[];
  const dataMetaverse = (await getData(
    `${process.env.CRYPTO_API_URL}&fsyms=SAND,MANA`,
    'metaverse'
  )) as CryptoType[];
  const dataDefi = (await getData(
    `${process.env.CRYPTO_API_URL}&fsyms=CRV,LDO,AAVE,UNI,MKR,SNX,COMP`,
    'defi'
  )) as CryptoType[];
  const dataInteroperability = (await getData(
    `${process.env.CRYPTO_API_URL}&fsyms=QNT,ATOM`,
    'interoperability'
  )) as CryptoType[];
  const dataNFT = (await getData(
    `${process.env.CRYPTO_API_URL}&fsyms=APE`,
    'nft'
  )) as CryptoType[];

  return (
    <Headers
      dataCurrencies={dataCurrencies}
      dataDefi={dataDefi}
      dataInteroperability={dataInteroperability}
      dataMetaverse={dataMetaverse}
      dataNFT={dataNFT}
      dataOracle={dataOracle}
      dataScalling={dataScalling}
      dataSmartContract={dataSmartContract}
      dataStablecoin={dataStablecoin}
      isAuth={isAuth}
      userData={userData}
    />
  );
}
