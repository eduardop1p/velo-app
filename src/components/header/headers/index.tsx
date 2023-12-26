'use client';

import Link from 'next/link';
import { FaSearch, FaUser } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

import LogoTitle from '@/components/logoTitle';
import Products from '@/components/products';
import { CryptoType } from '..';

interface Props {
  dataCurrencies: CryptoType[];
  dataSmartContract: CryptoType[];
  dataStablecoin: CryptoType[];
  dataScalling: CryptoType[];
  dataOracle: CryptoType[];
  dataMetaverse: CryptoType[];
  dataDefi: CryptoType[];
  dataInteroperability: CryptoType[];
  dataNFT: CryptoType[];
}

export default function Headers({
  dataCurrencies,
  dataSmartContract,
  dataStablecoin,
  dataScalling,
  dataOracle,
  dataMetaverse,
  dataDefi,
  dataInteroperability,
  dataNFT,
}: Props) {
  const pathName = usePathname();

  return pathName !== '/create-account' ? (
    <header className="h-20 fixed top-0 flex w-full flex-row items-center justify-between bg-primary px-20 z-10 border-b-2 border-black border-solid">
      <div className="flex flex-none items-center gap-20">
        <LogoTitle fontSize="text-4xl" color="text-black" />
        <nav className="flex gap-8">
          <Link href="/about-us" className="cursor-pointer text-sm text-black">
            About us
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
          <Link
            href="/newsletter"
            className="cursor-pointer text-sm text-black"
          >
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
  ) : (
    <header className="bg-black h-20 flex w-full items-center justify-center fixed top-0 px-20 z-10">
      <LogoTitle
        color="text-primary"
        fontSize="text-[43px]"
        font="font-semibold"
      />
    </header>
  );
}
