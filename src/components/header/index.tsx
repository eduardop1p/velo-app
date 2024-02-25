import { cookies } from 'next/headers';

import formatDataCrypto from '@/services/formatDataCrypto';
import { ActiveCryptoType } from '../products';
import NoAuthHeader from './noAuthHeader';

import AuthHeader from './authHeader';
import { UserType } from '@/app/api/models/users';

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
  CHANGEPCT24HOUR: number;
  IMAGEURL: string;
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
  let isAuth = cookie.has('token');
  const token = cookie.get('token')?.value;
  let userData: UserType;

  if (isAuth && token) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/show-user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });
    userData = await res.json();

    return <AuthHeader userData={userData} />;
  }

  const dataCurrencies: CryptoType[] = await getData(
    `${process.env.CRYPTO_API_URL}&fsyms=BTC,DOGE,XLM,LTC`,
    'currencies'
  );
  const dataSmartContract: CryptoType[] = await getData(
    `${process.env.CRYPTO_API_URL}&fsyms=ETH,ADA,SOL,DOT,AVAX,ALGO`,
    'smart-contract'
  );
  const dataStablecoin: CryptoType[] = await getData(
    `${process.env.CRYPTO_API_URL}&fsyms=USDC,USDT`,
    'stablecoin'
  );
  const dataScalling: CryptoType[] = await getData(
    `${process.env.CRYPTO_API_URL}&fsyms=MATIC,OP`,
    'scalling'
  );
  const dataOracle: CryptoType[] = await getData(
    `${process.env.CRYPTO_API_URL}&fsyms=LINK`,
    'oracle'
  );
  const dataMetaverse: CryptoType[] = await getData(
    `${process.env.CRYPTO_API_URL}&fsyms=SAND,MANA`,
    'metaverse'
  );
  const dataDefi: CryptoType[] = await getData(
    `${process.env.CRYPTO_API_URL}&fsyms=CRV,LDO,AAVE,UNI,MKR,SNX,COMP`,
    'defi'
  );
  const dataInteroperability: CryptoType[] = await getData(
    `${process.env.CRYPTO_API_URL}&fsyms=QNT,ATOM`,
    'interoperability'
  );
  const dataNFT: CryptoType[] = await getData(
    `${process.env.CRYPTO_API_URL}&fsyms=APE`,
    'nft'
  );

  return (
    <NoAuthHeader
      dataCurrencies={dataCurrencies}
      dataDefi={dataDefi}
      dataInteroperability={dataInteroperability}
      dataMetaverse={dataMetaverse}
      dataNFT={dataNFT}
      dataOracle={dataOracle}
      dataScalling={dataScalling}
      dataSmartContract={dataSmartContract}
      dataStablecoin={dataStablecoin}
    />
  );
}
