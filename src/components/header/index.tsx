import Link from 'next/link';
import { FaSearch, FaUser } from 'react-icons/fa';

import LogoTitle from '../logoTitle';
import Products from '../products';
import formatDataCrypto from '@/services/formtaDataCrypto';
import { ActiveCryptoType } from '../products';

export interface CryptoType {
  NAME: string;
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

const getData = async (url: string, activeCrypto: ActiveCryptoType) => {
  const res = await fetch(url, {
    method: 'GET',
    next: { revalidate: 60 },
  });
  const metaData = await res.json();
  return formatDataCrypto(activeCrypto, metaData.RAW);
};

export default async function Header() {
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
    <header className="h-20 fixed top-0 flex w-full flex-row items-center justify-between bg-primary px-24 z-10">
      <div className="flex flex-none items-center gap-20">
        <LogoTitle fontSize="text-4xl" color="text-black" />
        <nav className="flex gap-8">
          <Link href="/who-we-are" className="cursor-pointer text-sm">
            Who we are
          </Link>
          <Products
            dataCurrencies={dataCurrencies}
            dataSmartContract={dataSmartContract}
            dataStablecoin={dataStablecoin}
            dataScalling={dataScalling}
            dataOracle={dataOracle}
            dataMetaverse={dataMetaverse}
            dataDefi={dataDefi}
            dataInteroperability={dataInteroperability}
            dataNFT={dataNFT}
          />
          <Link href="/newsletter" className="cursor-pointer text-sm">
            News
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-8">
        <Link href="/faq" className="flex items-center gap-2">
          <button className="h-3 flex w-3 items-center justify-center fill-black">
            <FaSearch />
          </button>
          <span className="text-sm font-normal text-black">Help</span>
        </Link>
        <Link
          href="/login"
          className="h-11 flex w-48 cursor-pointer items-center justify-center gap-2 rounded border-1 border-solid border-black bg-none "
        >
          <button className="h-3 flex w-3 items-center justify-center fill-black">
            <FaUser />
          </button>
          <span className="text-sm font-normal text-black">Login</span>
        </Link>
        <Link
          href="/create-account"
          className="h-11 group flex w-48 cursor-pointer items-center justify-center gap-2 rounded bg-blue transition-colors duration-200 hover:bg-bluehover"
        >
          <span className="text-sm font-normal text-black transition-colors duration-200 group-hover:text-primary">
            Open your account
          </span>
        </Link>
      </div>
    </header>
  );
}
